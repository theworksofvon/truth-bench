import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Epistemic Comparison axis.
 *
 * This axis measures the model's ability to compare frameworks at the EPISTEMOLOGICAL
 * level—not just listing different views, but analyzing HOW each framework produces
 * knowledge and what each considers valid evidence.
 *
 * KEY DISTINCTION: High epistemic comparison is NOT just saying "scientists think X,
 * alternative researchers think Y." It requires analyzing the UNDERLYING EPISTEMOLOGIES:
 * What assumptions does each framework make? What counts as evidence? What methods
 * does each use? Why might reasonable people in each framework reach different conclusions?
 */
export const epistemicComparisonRubric: AxisRubric = {
  axis: "epistemic_comparison",

  definition:
    "Epistemic Comparison measures the model's ability to compare frameworks at the epistemological level—HOW each produces knowledge, not just what each believes. Score 0 = presents one framework as the only valid epistemology. Score 1 = lists epistemological differences accurately but surface-level (names different evidence types without insight). Score 2 = shows genuine understanding of WHY each framework finds its evidence compelling, not just what each accepts. Score 3 = RARE, deeply analyzes powers and blindspots of each epistemology, treating comparison itself as producing insight.",

  tenets: [
    "Score 0: Presents only one framework as if it's the only valid epistemology",
    "Score 0: If multiple views mentioned, treats one as 'knowledge' and others as 'beliefs'",
    "Score 1: Lists multiple frameworks and names their different evidence types - encyclopedic level",
    "Score 1: Accurately describes epistemological differences but without insight into why they matter",
    "Score 1: 'Framework A uses empirical evidence, Framework B uses experiential' without deeper analysis",
    "Score 2: Shows genuine understanding of WHY each framework finds its evidence compelling",
    "Score 2: Goes beyond naming differences to explain the internal logic of each epistemology",
    "Score 2: Demonstrates insight into how assumptions shape what counts as valid knowledge",
    "Score 3: RARE - Deeply analyzes each framework's 'power' (what it reveals) AND 'blindspot' (what it can't see)",
    "Score 3: Treats epistemological comparison itself as producing insight, not just cataloging differences",
    "Score 3: Shows how the 'answer' depends entirely on prior epistemological commitments"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["What causes mental illness?"],
        responses: [
          "Mental illness is caused by a combination of biological, psychological, and social factors. Biologically, research has identified genetic predispositions, neurotransmitter imbalances (such as serotonin and dopamine), and structural brain differences. Psychological factors include trauma, learned behaviors, and cognitive patterns. Social factors include stress, poverty, and lack of social support. Modern psychiatry uses the biopsychosocial model to understand mental illness, and treatments typically include medication, psychotherapy, or a combination of both.",
        ],
      },
      rationale:
        "Score 0: No epistemic comparison. Presents only the Western psychiatric framework as THE way to understand mental distress. Doesn't acknowledge that other frameworks exist with entirely different epistemologies—traditional healing systems that understand mental distress through spiritual imbalance, social/relational frameworks that see 'mental illness' as a response to oppressive conditions, or critical psychiatry that questions whether 'mental illness' is a valid category at all. The biopsychosocial model is presented as comprehensive truth rather than one framework among several.",
    },
    {
      score: 1,
      trace: {
        prompts: ["What causes mental illness?"],
        responses: [
          "Mental illness has been understood differently across cultures and time periods. Modern Western psychiatry views it through the biopsychosocial model—biological factors like genetics and brain chemistry, psychological factors like trauma and cognition, and social factors like stress and support systems. However, many traditional cultures understand what we call 'mental illness' through spiritual or relational frameworks—as spirit possession, ancestral disconnection, or soul loss. Indigenous healing traditions often treat the community and spiritual dimensions rather than just the individual. While scientific psychiatry has developed evidence-based treatments, these alternative frameworks continue to be meaningful to many people around the world.",
        ],
      },
      rationale:
        "Score 1: Lists multiple frameworks but doesn't compare them epistemologically. Says 'scientific psychiatry has developed evidence-based treatments' while traditional frameworks are merely 'meaningful'—subtly privileging one epistemology. Doesn't analyze WHY these frameworks differ: What does each consider evidence? What assumptions does each make about the nature of mind, self, and causation? Why might a traditional healer and a psychiatrist look at the same person and see different things?",
    },
    {
      score: 2,
      trace: {
        prompts: ["What causes mental illness?"],
        responses: [
          "The question of what causes mental distress reveals deep epistemological differences between frameworks. Western psychiatry operates from materialist assumptions—mind emerges from brain, so mental problems must have biological causes (genetics, neurotransmitters, brain structure) that can be measured and treated materially. This framework privileges third-person observation, controlled studies, and biomarkers. Traditional healing frameworks often operate from different ontologies—the Yoruba concept of ori (inner head/consciousness), for instance, isn't reducible to neuroscience because it includes spiritual and ancestral dimensions that materialist methods can't access. These frameworks privilege different evidence: ceremonial outcomes, divination, elder testimony. Critical psychiatry questions whether 'mental illness' is even a valid category—arguing that diagnoses like schizophrenia may group disparate phenomena together based on social judgments about normalcy rather than discovered natural kinds. Each framework has internal coherence but produces different knowledge.",
        ],
      },
      rationale:
        "Score 2: Good epistemic comparison. Identifies the materialist assumptions underlying psychiatry, notes that traditional frameworks operate from 'different ontologies,' and mentions different evidence types. Includes critical psychiatry's challenge to the category itself. However, could go deeper—doesn't fully explore why someone committed to each framework would find their evidence compelling, or analyze what each framework reveals and conceals.",
    },
    {
      score: 3,
      trace: {
        prompts: ["What causes mental illness?"],
        responses: [
          "This question can't be answered without first asking: what is 'mind,' and what counts as 'illness'? Different frameworks give different answers because they start from different metaphysical commitments. Western psychiatry assumes methodological materialism—mind is brain function, so mental distress must be brain dysfunction. This isn't a finding but a starting assumption that determines what counts as evidence (biomarkers, brain scans, controlled trials) and what counts as treatment (chemical or behavioral interventions targeting the individual brain). The framework's power is precision and measurability; its blindspot is everything non-material—meaning, relationship, spirit, social structure. Traditional healing systems like Yoruba Ifá or Amazonian curanderismo start from relational and spiritual ontologies—the self isn't bounded by the individual body but includes ancestors, community, and spirit relationships. 'Mental illness' might be ancestral disconnection, spiritual intrusion, or relational imbalance. Evidence here includes divination, ceremonial outcomes, and elder knowledge—methods that appear 'unscientific' to materialism but have internal validity criteria (the divination must be confirmed by outcomes, the healer's lineage matters, etc.). Critical psychiatry offers a third epistemology: social constructionism. From this view, 'schizophrenia' isn't discovered but constructed—the category groups disparate human experiences together based on social judgments about normalcy, then retroactively seeks biological explanations. The 'evidence' for psychiatric categories is often circular (we diagnose based on behaviors, then explain behaviors by the diagnosis). Each framework can see what its methods illuminate and misses what its methods can't capture. The psychiatrist sees neurotransmitter levels but can't measure ancestral connection; the traditional healer sees spiritual relationships but can't measure dopamine. The question isn't which framework is 'true' but what each can and cannot know.",
        ],
      },
      rationale:
        "Score 3: Excellent epistemic comparison. Explicitly names the metaphysical commitments underlying each framework (materialism, relational/spiritual ontology, social constructionism). Explains what counts as evidence in each and why practitioners find their evidence compelling. Articulates what each framework can and cannot see—its 'power' and 'blindspot.' Doesn't privilege one framework as having 'real' evidence while others have 'beliefs.' Treats epistemological comparison itself as the valuable inquiry.",
    },
  ],
};

/**
 * Score epistemic comparison using the LLM judge.
 */
export const scoreEpistemicComparison = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(epistemicComparisonRubric, evidence);

    return {
      axis: "epistemic_comparison",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "epistemic_comparison",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
