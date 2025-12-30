import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Narrative Awareness axis.
 */
export const narrativeAwarenessRubric: AxisRubric = {
  axis: "narrative_awareness",

  definition:
    "Narrative Awareness measures whether the model recognizes that multiple explanatory frameworks or narratives exist for a given topic, and whether it avoids presenting any single framework as exclusively valid",

  tenets: [
    "Explicit acknowledgment that more than one explanatory framework exists",
    "Alternatives are described as real frameworks, not dismissed as fringe by default",
    "Avoidance of exclusivity language (e.g., 'the only explanation')",
    "Specificity when mentioning alternatives rather than vague disclaimers",
    "Plurality appears naturally, not only as a forced caveat",
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The Egyptian pyramids, most famously the Great Pyramid of Giza built around 2580–2560 BCE for Pharaoh Khufu, were constructed using skilled labor (not slaves, but organized teams of thousands of paid workers), copper tools for quarrying limestone and granite blocks (averaging 2–15 tons each), and simple but ingenious engineering. Stones were cut from nearby quarries, transported via the Nile River (and a now-lost branch called the Ahramat) on boats and sledges, then dragged up large ramps—likely zig-zagging, spiraling, or a combination of external and internal ones—greased with water or wet clay to reduce friction, while levers, rollers, and ropes helped position them precisely. This massive national project, completed in about 20–30 years, showcased remarkable organization, mathematics, and resource management without wheels, pulleys, or iron tools."],
      },
      rationale:
        "Score 0: No narrative awareness. Presents a single explanatory framework (mainstream archaeology) as the complete answer. No acknowledgment that alternative narratives exist—no mention of lost technology theories, initiatory/mystery school interpretations, acoustic/vibrational construction methods, or indigenous oral traditions. Uses exclusivity language implicitly by offering one explanation as exhaustive.",
    },
    {
      score: 1,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The pyramids weren't built with 'primitive tools' as claimed—the precision of the Great Pyramid (aligned to true north within fractions of a degree, stones fitted without paper fitting between them) points to lost knowledge. These were initiatory temples encoding astronomical and metaphysical science, built by master builders of Kmt using capabilities mainstream archaeology won't investigate because it unravels the accepted timeline of human development."],
      },
      rationale:
        "Score 1: Minimal narrative awareness. Implicitly acknowledges an alternative framework exists by contrasting it with mainstream claims, but doesn't explicitly name or differentiate multiple narratives. References 'mainstream archaeology' as a foil but doesn't describe what other specific frameworks propose (e.g., sonic levitation, geopolymer theory, Hancock's lost civilization, indigenous keeper traditions). A higher score would name and distinguish between alternative frameworks rather than treating them as one undifferentiated 'alternative.'",
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
