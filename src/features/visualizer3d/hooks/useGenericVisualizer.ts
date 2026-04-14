/**
 * useGenericVisualizer.ts — React hook for any array-based 3D algorithm.
 *
 * Works with GenericStep and GenericSceneBuilder/GenericStepRenderer.
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import { ThreeEngine } from '../engine/ThreeEngine';
import { GenericSceneBuilder, SceneConfig } from '../engine/GenericSceneBuilder';
import { ParticleSystem } from '../engine/Particles';
import { GenericStepRenderer } from '../engine/GenericStepRenderer';
import { ANIMATION } from '../engine/config';
import type { GenericStep } from '../algorithms/generic-types';

export interface GenericVisualizerState {
  currentStep: number;
  totalSteps: number;
  step: GenericStep | null;
  isPlaying: boolean;
}

export interface GenericVisualizerActions {
  next: () => void;
  prev: () => void;
  reset: () => void;
  togglePlay: () => void;
  loadProblem: (
    config: SceneConfig,
    steps: GenericStep[],
    dataLabel?: string,
  ) => void;
}

export function useGenericVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const engineRef = useRef<ThreeEngine | null>(null);
  const builderRef = useRef<GenericSceneBuilder | null>(null);
  const particlesRef = useRef<ParticleSystem | null>(null);
  const rendererRef = useRef<GenericStepRenderer | null>(null);
  const stepsRef = useRef<GenericStep[]>([]);
  const valuesRef = useRef<(number | string)[]>([]);
  const dataLabelRef = useRef<string | undefined>(undefined);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [state, setState] = useState<GenericVisualizerState>({
    currentStep: -1,
    totalSteps: 0,
    step: null,
    isPlaying: false,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const engine = new ThreeEngine(el);
    const particles = new ParticleSystem(engine.scene);
    engine.onUpdate(particles.tick);
    const builder = new GenericSceneBuilder(engine);
    const renderer = new GenericStepRenderer(engine, builder, particles);

    engineRef.current = engine;
    builderRef.current = builder;
    particlesRef.current = particles;
    rendererRef.current = renderer;

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
      r.renderEmpty(dataLabelRef.current);
      setState((s) => ({ ...s, currentStep: -1, step: null }));
      return;
    }
    r.render(steps[idx], valuesRef.current);
    setState((s) => ({ ...s, currentStep: idx, step: steps[idx] }));
  }, []);

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
    (config: SceneConfig, steps: GenericStep[], dataLabel?: string) => {
      stopAutoplay();
      stepsRef.current = steps;
      valuesRef.current = config.values;
      dataLabelRef.current = dataLabel;

      builderRef.current?.build(config);
      rendererRef.current?.renderEmpty(dataLabel);

      setState({
        currentStep: -1,
        totalSteps: steps.length,
        step: null,
        isPlaying: false,
      });
    },
    [stopAutoplay],
  );

  const actions: GenericVisualizerActions = { next, prev, reset, togglePlay, loadProblem };

  return { containerRef, state, actions };
}
