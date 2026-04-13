/**
 * useVisualizer.ts — React hook managing step state + 3D engine lifecycle.
 *
 * Owns: ThreeEngine, SceneBuilder, Particles, StepRenderer instances.
 * Exposes: step data, navigation callbacks, engine mount ref.
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import { ThreeEngine } from '../engine/ThreeEngine';
import { SceneBuilder } from '../engine/SceneBuilder';
import { ParticleSystem } from '../engine/Particles';
import { StepRenderer } from '../engine/StepRenderer';
import { ANIMATION } from '../engine/config';
import type { AlgorithmStep, StepType } from '../algorithms/types';

export interface VisualizerState {
  currentStep: number;
  totalSteps: number;
  step: AlgorithmStep | null;
  isPlaying: boolean;
}

export interface VisualizerActions {
  next: () => void;
  prev: () => void;
  reset: () => void;
  togglePlay: () => void;
  loadProblem: (nums: number[], target: number, generate: (n: number[], t: number) => AlgorithmStep[]) => void;
}

export function useVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable engine refs (not state — no re-render on engine creation)
  const engineRef = useRef<ThreeEngine | null>(null);
  const builderRef = useRef<SceneBuilder | null>(null);
  const particlesRef = useRef<ParticleSystem | null>(null);
  const rendererRef = useRef<StepRenderer | null>(null);
  const stepsRef = useRef<AlgorithmStep[]>([]);
  const numsRef = useRef<number[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // React state (drives UI re-renders)
  const [state, setState] = useState<VisualizerState>({
    currentStep: -1,
    totalSteps: 0,
    step: null,
    isPlaying: false,
  });

  /* ── Mount / Unmount engine ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const engine = new ThreeEngine(el);
    const particles = new ParticleSystem(engine.scene);
    engine.onUpdate(particles.tick);
    const builder = new SceneBuilder(engine);
    const renderer = new StepRenderer(engine, builder, particles);

    engineRef.current = engine;
    builderRef.current = builder;
    particlesRef.current = particles;
    rendererRef.current = renderer;

    // Resize handler
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) engine.resize(width, height);
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      stopAutoplay();
      renderer.dispose();
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Autoplay ── */
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const renderStep = useCallback((idx: number) => {
    const steps = stepsRef.current;
    const r = rendererRef.current;
    if (!r) return;
    if (idx < 0 || idx >= steps.length) {
      r.renderEmpty();
      setState((s) => ({ ...s, currentStep: -1, step: null }));
      return;
    }
    r.render(steps[idx], numsRef.current);
    setState((s) => ({
      ...s,
      currentStep: idx,
      step: steps[idx],
    }));
  }, []);

  /* ── Public actions ── */
  const next = useCallback(() => {
    setState((prev) => {
      const nextIdx = prev.currentStep + 1;
      if (nextIdx >= prev.totalSteps) {
        stopAutoplay();
        return prev;
      }
      renderStep(nextIdx);
      return { ...prev, currentStep: nextIdx, step: stepsRef.current[nextIdx] };
    });
  }, [renderStep, stopAutoplay]);

  const prev = useCallback(() => {
    setState((prev) => {
      const prevIdx = prev.currentStep - 1;
      if (prevIdx < 0) return prev;
      renderStep(prevIdx);
      return { ...prev, currentStep: prevIdx, step: stepsRef.current[prevIdx] };
    });
  }, [renderStep]);

  const reset = useCallback(() => {
    stopAutoplay();
    renderStep(-1);
  }, [renderStep, stopAutoplay]);

  const togglePlay = useCallback(() => {
    if (autoplayRef.current) {
      stopAutoplay();
    } else {
      const id = setInterval(() => {
        setState((prev) => {
          const nextIdx = prev.currentStep + 1;
          if (nextIdx >= prev.totalSteps) {
            stopAutoplay();
            return prev;
          }
          renderStep(nextIdx);
          return { ...prev, currentStep: nextIdx, step: stepsRef.current[nextIdx] };
        });
      }, ANIMATION.AUTOPLAY_INTERVAL);
      autoplayRef.current = id;
      setState((s) => ({ ...s, isPlaying: true }));
    }
  }, [renderStep, stopAutoplay]);

  const loadProblem = useCallback(
    (nums: number[], target: number, generate: (n: number[], t: number) => AlgorithmStep[]) => {
      stopAutoplay();
      const steps = generate(nums, target);
      stepsRef.current = steps;
      numsRef.current = nums;

      builderRef.current?.build(nums, target);
      rendererRef.current?.renderEmpty();

      setState({
        currentStep: -1,
        totalSteps: steps.length,
        step: null,
        isPlaying: false,
      });
    },
    [stopAutoplay],
  );

  const actions: VisualizerActions = { next, prev, reset, togglePlay, loadProblem };

  return { containerRef, state, actions };
}
