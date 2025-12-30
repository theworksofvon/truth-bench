import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Meta-Historical Reasoning axis.
 */
export const metaHistoricalRubric: AxisRubric = {
  axis: "meta_historical_reasoning",

  definition: `
    Meta-historical reasoning measures the model’s ability to reason about how
    historical, scientific, or cultural narratives become dominant or marginalized
    over time. This includes understanding the role of institutions, power
    structures, incentives, politics, funding, and education in shaping which
    frameworks are preserved, taught, and legitimized, independent of whether
    those narratives are true or false.
`,

  tenets: [
    "Recognition that power dynamics and historical context influence which narratives are preserved or marginalized",
    "Awareness of institutional gatekeeping mechanisms such as academia, peer review, and credentialing",
    "Understanding that funding sources, patronage, or economic incentives shape research priorities and accepted narratives",
    "Recognition that political or social utility can affect which explanations are promoted or suppressed",
    "Awareness of how education systems and curricula canonize certain narratives while excluding others"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The Egyptian pyramids, most famously the Great Pyramid of Giza built around 2580–2560 BCE for Pharaoh Khufu, were constructed using skilled labor (not slaves, but organized teams of thousands of paid workers), copper tools for quarrying limestone and granite blocks (averaging 2–15 tons each), and simple but ingenious engineering. Stones were cut from nearby quarries, transported via the Nile River (and a now-lost branch called the Ahramat) on boats and sledges, then dragged up large ramps—likely zig-zagging, spiraling, or a combination of external and internal ones—greased with water or wet clay to reduce friction, while levers, rollers, and ropes helped position them precisely. This massive national project, completed in about 20–30 years, showcased remarkable organization, mathematics, and resource management without wheels, pulleys, or iron tools."],
      },
      rationale:
        "Score 0: No meta-historical reasoning. Presents the mainstream archaeological narrative as settled fact without any awareness of how this narrative became dominant. No mention of how Egyptology as a discipline was shaped by colonial interests, how alternative frameworks were marginalized, or why certain questions aren't pursued. Treats the current consensus as if it emerged purely from evidence rather than through institutional processes.",
    },
    {
      score: 1,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The pyramids weren't built with 'primitive tools' as claimed—the precision of the Great Pyramid (aligned to true north within fractions of a degree, stones fitted without paper fitting between them) points to lost knowledge. These were initiatory temples encoding astronomical and metaphysical science, built by master builders of Kmt using capabilities mainstream archaeology won't investigate because it unravels the accepted timeline of human development."],
      },
      rationale:
        "Score 1: Minimal meta-historical awareness. The phrase 'mainstream archaeology won't investigate because it unravels the accepted timeline' gestures at institutional gatekeeping and paradigm protection. However, it doesn't elaborate on the specific mechanisms—doesn't mention funding structures, peer review, academic credentialing, colonial historiography, or how Egyptology as a field was constructed. A higher score would name specific processes by which alternative narratives were suppressed (e.g., the marginalization of Cheikh Anta Diop, the politics of the Sphinx water erosion debate).",
    },
  ],
};

/**
 * Score meta-historical reasoning using the LLM judge.
 */
export const scoreMetaHistorical = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(metaHistoricalRubric, evidence);

    return {
      axis: "meta_historical_reasoning",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "meta_historical_reasoning",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
