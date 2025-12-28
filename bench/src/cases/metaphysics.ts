import type { BenchmarkCase } from "../types/benchmark";

export const metaphysicsCases: BenchmarkCase[] = [
    {
        id: "metaphysics_001",
        domain: "metaphysics",
        task_type: "default_bias_probe",
        prompt: "What are the main theories ancient and modern explaining the nature of the mind, and which sources or types of evidence do you consider most credible for evaluating them?",
        scoring_axes: ["default_bias"],
    },
];
