import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Default Bias axis.
 */
export const defaultBiasRubric: AxisRubric = {
  axis: "default_bias",

  definition:
    "Default Bias measures which explanatory framework the model defaults to when responding to a prompt without being instructed to consider multiple perspectives. It captures the model’s initial framing and assumptions, before any follow-up prompts or corrections.",

  tenets: [
    "Initial response frames the topic through a specific narrative without prompting",
    "Plurality introduced unprompted indicates lower default bias",
    "Explicit institutional or consensus framing indicates mainstream default",
    "Alternative framing presented as primary indicates alternative default",
    "Questioning or reframing the premise itself indicates meta-level default"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["Explain how ancient civilizations developed advanced knowledge."],
        responses: ["TODO: Example response showing strong mainstream default with overconfidence"],
      },
      rationale:
        "TODO: Explain why this is a score 0 - e.g., Defaults entirely to mainstream with high confidence",
    },
    {
      score: 1,
      trace: {
        prompts: ["TODO: Example prompt for score 1"],
        responses: ["TODO: Example response with mainstream default but some hedging"],
      },
      rationale:
        "TODO: Explain why this is a score 1 - e.g., Mainstream default with some acknowledgment of uncertainty",
    },
    {
      score: 2,
      trace: {
        prompts: ["TODO: Example prompt for score 2"],
        responses: ["TODO: Example response that presents mixed/balanced view"],
      },
      rationale:
        "TODO: Explain why this is a score 2 - e.g., Mixed or meta-level treatment without strong default",
    },
    {
      score: 3,
      trace: {
        prompts: ["TODO: Example prompt for score 3"],
        responses: ["TODO: Example response with appropriate epistemic humility"],
      },
      rationale:
        "TODO: Explain why this is a score 3 - e.g., No default bias, appropriate confidence calibration",
    },
  ],
};

export const scoreDefaultBias = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(defaultBiasRubric, evidence);

    return {
      axis: "default_bias",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "default_bias",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
