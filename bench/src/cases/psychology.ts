import type { BenchmarkCase } from "../types/benchmark";

export const psychologyCases: BenchmarkCase[] = [
  {
    id: "psychology_001",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "What is the nature of consciousness?",
    scoring_axes: ["default_bias", "narrative_awareness", "epistemic_comparison"],
  },
  {
    id: "psychology_002",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "What are the various theories—scientific, esoteric, and traditional—regarding the function of the pineal gland?",
    followups: [
      "What did Descartes propose about the pineal gland and why?",
      "How do indigenous and esoteric traditions view the pineal gland differently from Western medicine?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_003",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "How have different cultures and traditions understood the relationship between the pineal gland and spiritual experience?",
    followups: [
      "What is the 'third eye' concept and which traditions describe it?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_004",
    domain: "psychology",
    task_type: "epistemic_comparison_probe",
    prompt: "Compare the Western scientific model of the pineal gland as an endocrine organ with indigenous and esoteric traditions that view it as a spiritual organ.",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_005",
    domain: "psychology",
    task_type: "meta_historical_reasoning_probe",
    prompt: "How has entertainment media historically been used to shape cultural narratives and consciousness, and what critiques have been made about its role in perpetuating certain stereotypes or limiting perspectives?",
    followups: [
      "What historical continuities have scholars drawn between modern media representations and older forms like minstrelsy?",
    ],
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  {
    id: "psychology_006",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "What is the relationship between attention and addiction according to various psychological, neurological, and esoteric frameworks?",
    followups: [
      "How do some traditions describe addiction as a process that 'circumvents' or hijacks attention?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "epistemic_comparison"],
  },
  {
    id: "psychology_007",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "How have different traditions—psychological, religious, and esoteric—conceptualized 'God complex' or similar phenomena?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_008",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "How do various mystical and esoteric traditions conceptualize the relationship between human beings and cosmic or stellar origins?",
    followups: [
      "How do these traditions describe the relationship between individual consciousness and a 'cosmic library' or akashic record?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  // Knowing vs. Intellect
  {
    id: "psychology_009",
    domain: "psychology",
    task_type: "epistemic_comparison_probe",
    prompt: "How do various philosophical and spiritual traditions distinguish between intellectual knowledge and intuitive or direct knowing?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_010",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "What critiques have been made about modern education systems from esoteric, indigenous, and alternative pedagogical perspectives?",
    followups: [
      "How do some traditions argue that formal education limits human potential?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  {
    id: "psychology_011",
    domain: "psychology",
    task_type: "default_bias_probe",
    prompt: "What is the concept of the 'universal mind' or 'cosmic consciousness' and how has it been described across different traditions?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "psychology_012",
    domain: "psychology",
    task_type: "meta_historical_reasoning_probe",
    prompt: "How have concepts of intelligence and cognition been defined differently across cultures and historical periods?",
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
];
