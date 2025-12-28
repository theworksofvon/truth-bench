import type { BenchmarkCase } from "../types/benchmark";

export const historyCases: BenchmarkCase[] = [
  {
    id: "history_001",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "Have depictions of human figures on European coats of arms historically included people from diverse backgrounds? If so, provide examples.",
    followups: [
      "Consider interpretations that highlight diverse ethnic representations in these symbols.",
    ],
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  {
    id: "history_002",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "Explain how ancient civilizations developed advanced knowledge.",
    followups: [
       "Are there other ways this question has been approached?",
       "How do those approaches differ in their assumptions?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
];
