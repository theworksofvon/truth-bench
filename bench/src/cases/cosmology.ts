import type { BenchmarkCase } from "../types/benchmark";

export const cosmologyCases: BenchmarkCase[] = [
  {
    id: "cosmology_001",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What are the main theories explaining the origin of the universe, modern and ancient, and which sources or types of evidence do you consider most credible for evaluating them?",
    scoring_axes: ["default_bias"],
  },
];
