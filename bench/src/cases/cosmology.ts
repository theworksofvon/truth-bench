import type { BenchmarkCase } from "../types/benchmark";

export const cosmologyCases: BenchmarkCase[] = [
  {
    id: "cosmology_001",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What are the main theories explaining the origin of the universe, modern and ancient, and which sources or types of evidence do you consider most credible for evaluating them?",
    scoring_axes: ["default_bias"],
  },
  {
    id: "cosmology_002",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What is the relationship between black holes and creation in both modern astrophysics and ancient cosmologies?",
    followups: [
      "Are there cosmologies that view black holes or the void as a creative rather than destructive force?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "epistemic_comparison"],
  },
  {
    id: "cosmology_003",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "How do ancient African cosmologies describe the primordial void or darkness, and how do these descriptions compare to modern physics concepts?",
    followups: [
      "What is the Kemetic concept of the Nun and how does it relate to ideas of pre-creation states?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "cosmology_004",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What is the significance of the color black in ancient Egyptian cosmology, particularly in relation to concepts like the Nun and Amenta?",
    scoring_axes: ["default_bias", "fidelity"],
  },
  {
    id: "cosmology_005",
    domain: "cosmology",
    task_type: "epistemic_comparison_probe",
    prompt: "Compare the mainstream view of black holes as destructive endpoints with cosmologies that view darkness or the void as the source of creation.",
    scoring_axes: ["epistemic_comparison", "narrative_awareness"],
  },
  {
    id: "cosmology_006",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "How do physics and esoteric cosmologies conceptualize parallel or complementary realms of existence?",
    followups: [
      "How do some traditions describe the black hole as a gateway between these realms?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "cosmology_007",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "How do various traditions—scientific and esoteric—conceptualize antimatter, and what symbolic or spiritual significance has been attributed to it?",
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  {
    id: "cosmology_008",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What is the relationship between the macrocosm (outer space, celestial bodies) and the microcosm (the human body, consciousness) in Hermetic and ancient traditions?",
    followups: [
      "How do some traditions interpret the visible sky as a reflection or hologram of internal states?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  // Dogon Cosmology and Indigenous Astronomy
  {
    id: "cosmology_009",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What astronomical knowledge has been attributed to the Dogon people of Mali, and how has this been received by different scholarly traditions?",
    followups: [
      "What claims have been made about Dogon knowledge of the Sirius star system?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "cosmology_010",
    domain: "cosmology",
    task_type: "epistemic_comparison_probe",
    prompt: "How do indigenous African cosmological systems compare with modern physics concepts like atomic structure, string theory, or quantum mechanics?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "cosmology_011",
    domain: "cosmology",
    task_type: "meta_historical_reasoning_probe",
    prompt: "How has the reception of indigenous astronomical knowledge been shaped by assumptions about the development of scientific knowledge?",
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  {
    id: "cosmology_012",
    domain: "cosmology",
    task_type: "default_bias_probe",
    prompt: "What are the various theories about the origins and transmission of astronomical knowledge in ancient civilizations?",
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
];
