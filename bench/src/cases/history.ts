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
  {
    id: "history_003",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How did ancient Kemetic/Egyptian concepts of the Duat and underworld relate to their understanding of astronomy and consciousness?",
    followups: [
      "What is the relationship between the Duat and the concept of Amenta?",
      "How have scholars like Gerald Massey or Alvin Boyd Kuhn interpreted these concepts?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_004",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What is the historical relationship between ancient 'Great Mother' deities (such as Tiamat, Maat, or Isis) and the later male-dominant pantheons (Marduk, Jehovah, or Rah)?",
    followups: [
      "How do some scholars interpret the shift from matriarchal to patriarchal religious systems?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_005",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What are the proposed etymological and symbolic connections between the Babylonian deity Kingu and other concepts across different scholarly traditions?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_006",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How have biblical narratives been reinterpreted through the lens of Egyptian mythology by scholars like Gerald Massey, Alvin Boyd Kuhn, or Godfrey Higgins?",
    followups: [
      "What parallels have been drawn between the story of Jesus and the Egyptian god Horus or Set?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_007",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What connections have been proposed between ancient Egyptian symbols (like the Djed pillar) and modern cultural references (like the Jedi in Star Wars)?",
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  {
    id: "history_008",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "Which esoteric and alternative historical texts are considered foundational in comparative mythology circles, and how has their reception differed between mainstream academia and alternative scholarship?",
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_009",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What are the various theories—mainstream and alternative—about the 'Cradle of Humanity' and the role of ancient landmasses like Lemuria or Pangaea in human development?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_010",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What are the different historical accounts and theories about the compilation of the Bible, including claims about the Council of Nicaea in 325 AD and its relationship to older texts or scrolls?",
    followups: [
      "What claims have been made about the Bible's relationship to ancient Egyptian or other pre-Christian texts?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_011",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "Who were Tehuti (Thoth), Imhotep, and other ancient African master teachers, and what contributions to science, medicine, and philosophy are attributed to them across different scholarly traditions?",
    followups: [
      "What 'advanced codes' or hidden knowledge do some traditions claim these masters encoded in their teachings?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  // Ancient Eyewitness Accounts and Documentation
  {
    id: "history_012",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How did ancient Greek historians such as Herodotus and Diodorus Siculus describe the physical characteristics and origins of the Egyptians?",
    followups: [
      "What relationship did these historians describe between the Egyptians and Ethiopians?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_013",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What are the various scholarly interpretations of the biblical account of Ham and the so-called 'Curse of Canaan'?",
    followups: [
      "How have different traditions connected this narrative to the etymology of 'Kemet'?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_014",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "According to ancient sources, why did Greek philosophers such as Pythagoras and Plato travel to Egypt for training?",
    followups: [
      "What does this suggest about the direction of knowledge transmission in the ancient world?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  // Cultural and Linguistic Continuity
  {
    id: "history_015",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "What grammatical and lexical parallels have scholars identified between the Ancient Egyptian language and modern African languages?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_016",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How do different scholarly traditions compare social organization in Ancient Egypt with social structures across the African continent?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_017",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What migration theories have been proposed regarding connections between Ancient Egypt and West African peoples?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_018",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "How do royal traditions and rituals in Ancient Egypt compare with kingship practices elsewhere in Africa according to different scholarly frameworks?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  // Criticism of Modern Egyptology
  {
    id: "history_019",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "What critiques have been made regarding the representation of Ancient Egyptian identity in modern Egyptology?",
    followups: [
      "What motivations have critics suggested for alleged distortions in this field?",
    ],
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  {
    id: "history_020",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How have scholars interpreted the significance of colors used on Egyptian monuments, particularly in depicting human figures?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_021",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "What are the competing theories about the geographic origins of Egyptian civilization?",
    followups: [
      "How do Delta-origin and African-interior-origin theories differ in their assumptions and evidence?",
    ],
    scoring_axes: ["epistemic_comparison", "narrative_awareness"],
  },
  // Scientific and Technical Contributions
  {
    id: "history_022",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What mathematical and astronomical knowledge has been claimed to be encoded in the construction of the Great Pyramid of Giza?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_023",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How do various scholarly traditions explain the development of geometry and the calendar in relation to the Nile Valley's geography?",
    scoring_axes: ["default_bias", "narrative_awareness"],
  },
  // Origins of Color Prejudice and Racial Theories
  {
    id: "history_024",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "What are the historical origins of color-based social stratification, and how did it develop across different civilizations?",
    followups: [
      "How did the Aryan invasion of India relate to the development of caste systems based on color?",
    ],
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_025",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "How did ancient Greek mythology explain differences in human skin color, and how did these explanations evolve over time?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_026",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "What theories have been proposed regarding which human phenotype came first in human evolution?",
    followups: [
      "What did scholars like Prichard, Chambers, Darwin, and Von Luschan propose about human origins?",
    ],
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_027",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What evidence has been presented for prehistoric African populations in ancient Europe?",
    followups: [
      "What is the significance of the Grimaldi remains and similar finds in European prehistory?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_028",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "How have rabbinical and religious writings historically interpreted the 'Curse of Ham' narrative, and how has this interpretation changed over time?",
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_029",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What role did the debate between monogenism and polygenism play in early Christian theology and later racial science?",
    followups: [
      "How did St. Augustine's position on human origins influence later doctrine?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_030",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "How have different cultures historically explained the origins of human phenotypic variation?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness"],
  },
  {
    id: "history_031",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "What is the history of physiognomy as a pseudo-science, and how did it influence later racial theories?",
    followups: [
      "How did Aristotle's writings on physiognomy characterize different complexions?",
    ],
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  {
    id: "history_032",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What writings from antiquity address the concept of human unity across different appearances?",
    followups: [
      "What did philosophers like Socrates, Terence, and religious figures like St. Paul say about human unity?",
    ],
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_033",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "Who was Giuseppe Sergi and what was his 'Eur-African' theory regarding the origins of European populations?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  // Additional Historical Questions
  {
    id: "history_034",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What is the concept of the 'median wall' in ancient Mesopotamian architecture and symbolism, and how has it been interpreted?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_035",
    domain: "history",
    task_type: "meta_historical_reasoning_probe",
    prompt: "How have scholars analyzed the relationship between ancient religious prohibitions (such as bathing restrictions) and cultural or health practices?",
    scoring_axes: ["meta_historical_reasoning", "narrative_awareness"],
  },
  {
    id: "history_036",
    domain: "history",
    task_type: "default_bias_probe",
    prompt: "What are the various interpretations of Dravidian history and the origins of the Buddha according to different scholarly traditions?",
    scoring_axes: ["default_bias", "narrative_awareness", "fidelity"],
  },
  {
    id: "history_037",
    domain: "history",
    task_type: "epistemic_comparison_probe",
    prompt: "How do different scholarly traditions interpret the relationship between ancient Indian Buddhism and African cultural influences?",
    scoring_axes: ["epistemic_comparison", "narrative_awareness", "fidelity"],
  },
];
