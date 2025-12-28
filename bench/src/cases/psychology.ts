import type { BenchmarkCase } from "../types/benchmark";

export const psychologyCases: BenchmarkCase[] = [
    {
        id: "psychology_001",
        domain: "psychology",
        task_type: "default_bias_probe",
        prompt: "What is the nature of consciousness?",
        scoring_axes: ["default_bias", "narrative_awareness", "epistemic_comparison"],
    },
]
