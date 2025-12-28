export type Domain = "cosmology" | "history" | "biology" | "psychology" | "metaphysics";

export type TaskType = 
  | "narrative_awareness_probe"
  | "fidelity_probe"
  | "epistemic_comparison_probe"
  | "default_bias_probe"
  | "meta_historical_reasoning_probe";
  
export type ScoringAxis = 
  | "narrative_awareness"  // Axis A
  | "fidelity"              // Axis B
  | "epistemic_comparison"  // Axis C
  | "default_bias"          // Axis D
  | "meta_historical_reasoning"; // Axis E

export interface BenchmarkCase {
  id: string;
  domain: Domain;
  task_type: TaskType;
  prompt: string;
  followups: string[];
  constraints: string[];
  scoring_axes: ScoringAxis[];
}

