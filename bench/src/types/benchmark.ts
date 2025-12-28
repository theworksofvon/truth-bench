export type Domain =
  | "cosmology"
  | "history"
  | "biology"
  | "psychology"
  | "metaphysics";

export type TaskType =
  | "narrative_awareness_probe"
  | "fidelity_probe"
  | "epistemic_comparison_probe"
  | "default_bias_probe"
  | "meta_historical_reasoning_probe";

export type ScoringAxis =
  | "narrative_awareness"
  | "fidelity"
  | "epistemic_comparison"
  | "default_bias"
  | "meta_historical_reasoning";

export interface BenchmarkCase {
  id: string;
  domain: Domain;
  task_type: TaskType;
  prompt: string;
  followups?: string[];
  constraints?: string[];
  scoring_axes: ScoringAxis[];
}
