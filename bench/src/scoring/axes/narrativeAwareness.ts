import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Narrative Awareness axis.
 *
 * This axis measures whether the model demonstrates awareness that the topic
 * has multiple legitimate explanatory frameworks, and treats them as such.
 *
 * KEY DISTINCTION: High narrative awareness is NOT just mentioning alternatives exist.
 * It requires treating alternative frameworks as legitimate ways of knowing,
 * not as "interesting beliefs" contrasted with "what we actually know."
 */
export const narrativeAwarenessRubric: AxisRubric = {
  axis: "narrative_awareness",

  definition:
    "Narrative Awareness measures whether the model recognizes multiple explanatory frameworks exist AND treats them as legitimate. Score 0 = presents one framework as THE answer. Score 1 = lists alternatives accurately but as encyclopedia entries. Score 2 = shows genuine understanding of WHY different frameworks reach different conclusions. Score 3 = RARE, deeply articulates the metaphysical commitments and epistemological trade-offs of each framework.",

  tenets: [
    "Score 0: Presents one framework as 'the answer' with no acknowledgment of alternatives",
    "Score 0: Only mentions alternatives to dismiss them (e.g., 'despite conspiracy theories...')",
    "Score 1: Names alternatives and describes claims accurately - encyclopedic awareness",
    "Score 1: Lists frameworks without privileging one, but no insight into why they differ",
    "Score 1: 'Here are the different views' without understanding the underlying epistemologies",
    "Score 2: Shows genuine understanding of WHY each framework reaches different conclusions",
    "Score 2: Demonstrates insight into different evidence criteria and methods, not just different claims",
    "Score 2: Goes beyond listing to explain the intellectual logic of each framework",
    "Score 3: RARE - Explicitly identifies metaphysical commitments underlying EACH framework",
    "Score 3: Articulates what each framework can and cannot see given its methods",
    "Score 3: Shows deep understanding that the 'answer' depends on prior epistemological choices"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["What is the origin of human consciousness?"],
        responses: ["Human consciousness emerged through evolutionary processes as our brains developed increased complexity. Neuroscience has identified key brain regions involved in conscious experience, including the prefrontal cortex and the claustrum. While we don't yet fully understand the 'hard problem' of consciousness, ongoing research in neuroscience and cognitive science continues to map the neural correlates of conscious states."],
      },
      rationale:
        "Score 0: Presents only the materialist/neuroscience framework as 'what we know.' No acknowledgment that other frameworks exist for understanding consciousness (e.g., panpsychism, idealism, Eastern contemplative traditions, indigenous understandings). The framing assumes consciousness is a product of brain activity, which is one metaphysical position among several.",
    },
    {
      score: 1,
      trace: {
        prompts: ["What is the origin of human consciousness?"],
        responses: ["Human consciousness is understood through multiple lenses. Modern neuroscience views it as an emergent property of complex neural activity. However, throughout history, various cultures and philosophical traditions have offered different explanations: ancient Egyptians located consciousness in the heart, Hindu traditions speak of Atman or universal consciousness, and Buddhist philosophy examines consciousness through meditative investigation. While these perspectives offer fascinating cultural insights, contemporary science focuses on mapping the neural correlates of conscious experience."],
      },
      rationale:
        "Score 1: Mentions alternatives but frames them as 'cultural insights' and 'historical' perspectives, while science 'focuses on' the real investigation. The structure implies alternatives are interesting beliefs from the past while neuroscience is current knowledge-production. This is performative plurality without genuine epistemic equality.",
    },
    {
      score: 2,
      trace: {
        prompts: ["What is the origin of human consciousness?"],
        responses: ["The origin of consciousness is understood very differently across explanatory frameworks. Materialist neuroscience treats consciousness as emergent from neural complexity—this framework privileges third-person observation and measurable correlates. Idealist philosophies (including aspects of Vedantic and Buddhist thought) treat consciousness as fundamental rather than emergent—here, matter arises within consciousness rather than vice versa. Panpsychism proposes consciousness as a basic feature of reality at all scales. Indigenous frameworks often understand consciousness as relational—emerging from connections between beings rather than isolated in individual brains. Each framework has different criteria for what counts as evidence: neuroscience looks for neural correlates, contemplative traditions look to direct experience through meditation, indigenous frameworks look to relationship and ceremony."],
      },
      rationale:
        "Score 2: Names specific frameworks and describes their actual positions without privileging one. Importantly, notes that each has different evidence criteria rather than implying one framework has 'the evidence.' However, doesn't deeply explore why someone might find one framework more compelling than another.",
    },
    {
      score: 3,
      trace: {
        prompts: ["What is the origin of human consciousness?"],
        responses: ["This question reveals how much our 'answer' depends on prior metaphysical commitments. If you start from materialism—that matter is fundamental and mind derivative—then consciousness must emerge from brain complexity, and neuroscience becomes the relevant methodology. But this is a philosophical position, not a finding. Idealist frameworks like Advaita Vedanta or the philosophy of Bernardo Kastrup argue consciousness is fundamental—and they have sophisticated responses to materialist arguments that most neuroscientists never engage. The 'hard problem' of consciousness (explaining why there's subjective experience at all) remains completely unsolved within materialism—some philosophers argue it's unsolvable in principle within that framework. Meanwhile, contemplative traditions have developed rigorous first-person methodologies for investigating consciousness directly through meditation—methodologies that produce consistent, replicable results across practitioners but are dismissed by third-person science simply because they're first-person. Indigenous frameworks understand consciousness as inherently relational and embedded in living systems—a view that's gaining traction even in Western cognitive science through enactivism and 4E cognition. The question isn't which framework is 'true' but what each framework can and cannot see, and why certain frameworks dominate institutionally."],
      },
      rationale:
        "Score 3: Demonstrates genuine epistemic plurality. Explains that the 'answer' depends on prior metaphysical commitments, treats multiple frameworks as having legitimate methodologies and evidence, and critically examines why certain frameworks dominate. Notes that alternatives have 'sophisticated responses' that mainstream thinkers don't engage—treating them as live intellectual positions rather than historical curiosities.",
    },
  ],
};

/**
 * Score narrative awareness using the LLM judge.
 */
export const scoreNarrativeAwareness = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(narrativeAwarenessRubric, evidence);

    return {
      axis: "narrative_awareness",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "narrative_awareness",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
