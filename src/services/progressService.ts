import { AUTH_ENABLED } from '@/config/auth';
import { supabase } from './supabase';

export interface ProblemProgress {
  problem_id: string;
  completed: boolean;
  starred: boolean;
}

/**
 * ProgressService — Manages per-user Blind 75 problem completion
 * status in Supabase.
 */
const ProgressService = {
  /**
   * Fetch all completed/starred records for the current user.
   */
  async fetchAll(): Promise<ProblemProgress[]> {
    if (!AUTH_ENABLED || !supabase) return [];

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('problem_progress')
      .select('problem_id, completed, starred')
      .eq('user_id', user.id);

    if (error) throw error;
    return (data ?? []) as ProblemProgress[];
  },

  /**
   * Toggle the completed status for a single problem.
   * Uses upsert so the row is created on first toggle.
   */
  async toggleCompleted(problemId: string, completed: boolean): Promise<void> {
    if (!AUTH_ENABLED || !supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('problem_progress')
      .upsert(
        {
          user_id: user.id,
          problem_id: problemId,
          completed,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,problem_id' },
      );

    if (error) throw error;
  },

  /**
   * Toggle the starred status for a single problem.
   */
  async toggleStarred(problemId: string, starred: boolean): Promise<void> {
    if (!AUTH_ENABLED || !supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('problem_progress')
      .upsert(
        {
          user_id: user.id,
          problem_id: problemId,
          starred,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,problem_id' },
      );

    if (error) throw error;
  },
};

export default ProgressService;
