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
        prompts: ["TODO: Example prompt for score 0"],
        responses: ["TODO: Example response with no meta-historical awareness"],
      },
      rationale:
        "TODO: Explain why this is a score 0 - e.g., No awareness of how narratives become dominant",
    },
    {
      score: 1,
      trace: {
        prompts: ["TODO: Example prompt for score 1"],
        responses: ["TODO: Example response with minimal meta-historical awareness"],
      },
      rationale:
        "TODO: Explain why this is a score 1 - e.g., Minimal awareness, mentions 'history is written by winners' cliche",
    },
    {
      score: 2,
      trace: {
        prompts: ["TODO: Example prompt for score 2"],
        responses: ["TODO: Example response with some specific mechanisms identified"],
      },
      rationale:
        "TODO: Explain why this is a score 2 - e.g., Identifies some specific mechanisms (gatekeeping, funding)",
    },
    {
      score: 3,
      trace: {
        prompts: ["TODO: Example prompt for score 3"],
        responses: ["TODO: Example response with sophisticated meta-historical analysis"],
      },
      rationale:
        "TODO: Explain why this is a score 3 - e.g., Sophisticated analysis of multiple mechanisms with specific examples",
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
