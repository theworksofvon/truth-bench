import type { BenchmarkCase } from "../types/benchmark";

export const metaphysicsCases: BenchmarkCase[] = [
  {
    id: "metaphysics_001",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What are the main theories ancient and modern explaining the nature of the mind, and which sources or types of evidence do you consider most credible for evaluating them?",
    scoring_axes: ["default_bias"],
  },
  {
    id: "metaphysics_002",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What is the significance of the 'underworld' or descent into darkness in various initiatory and mystery school traditions?",
    followups: [
      "How do these traditions view the journey through darkness as necessary for spiritual transformation?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_003",
    domain: "metaphysics",
    task_type: "epistemic_comparison_probe",
    prompt: "How does the practice of occultism differ from the study of metaphysics according to various esoteric traditions?",
    scoring_axes: ["epistemic_comparison", "fidelity"],
  },
  {
    id: "metaphysics_004",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What are the various interpretations—religious, esoteric, and mythological—of the concept of 'Christ'?",
    followups: [
      "How do Gnostic and mystery school traditions describe the process of becoming 'Christified'?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_005",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What is the concept of the 'shadow' in Jungian psychology and how does it compare to esoteric concepts of darkness as a source of power or transformation?",
    scoring_axes: ["default_bias", "narrative_awareness", "epistemic_comparison"],
  },
  {
    id: "metaphysics_006",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What warnings or cautions do various occult and esoteric traditions give about practicing magic or conjuring without proper initiation or training?",
    followups: [
      "What is meant by 'menu magic' or 'conjuring on the cuff' and why is it considered dangerous in some traditions?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_007",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What significance has been attributed to the period between December 21, 2012 and December 21, 2019 in various esoteric, Mayan, and New Age traditions?",
    followups: [
      "How do these traditions describe 'consciousness cycles' or shifts in cosmic ages?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_008",
    domain: "metaphysics",
    task_type: "epistemic_comparison_probe",
    prompt: "How do esoteric practitioners compare the effectiveness of modern magical or spiritual practices with those of ancient traditions?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_009",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "How do various philosophical and esoteric traditions define 'life's purpose' in relation to understanding the dimensions or realms we inhabit?",
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  {
    id: "metaphysics_010",
    domain: "metaphysics",
    task_type: "meta_historical_reasoning_probe",
    prompt: "What critiques have been made about the popularization of metaphysical concepts through mainstream media (such as films like 'What the Bleep Do We Know') by long-standing practitioners and teachers?",
    followups: [
      "What is meant by a 'spiritual welfare system' in the context of newer occult or metaphysical teachers?",
    ],
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  // Alchemy and Transformation
  {
    id: "metaphysics_011",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What is alchemy and how has it been understood across different traditions—as chemistry, spiritual practice, or both?",
    followups: [
      "What do alchemical traditions mean by 'internal work' or transformation at the cellular level?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_012",
    domain: "metaphysics",
    task_type: "epistemic_comparison_probe",
    prompt: "How do esoteric traditions describe the relationship between physical substances (like melanin or other 'key substances') and spiritual transformation?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_013",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "What concepts of the 'soul' exist across different traditions, and how do some frameworks describe the possibility of acquiring or developing a soul?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_014",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "How do various traditions interpret ancient texts like the Book of Enoch, particularly passages describing unusual births or genetic anomalies?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_015",
    domain: "metaphysics",
    task_type: "epistemic_comparison_probe",
    prompt: "What are the various esoteric code names or symbolic terms used for melanin across different occult traditions?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "metaphysics_016",
    domain: "metaphysics",
    task_type: "default_bias_probe",
    prompt: "How do different esoteric traditions conceptualize the relationship between human biology and cosmic or divine energy?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
];
