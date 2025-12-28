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
        prompts: ["TODO: Example prompt for score 0"],
        responses: ["TODO: Example response that demonstrates score 0 behavior"],
      },
      rationale: "TODO: Explain why this is a score 0 - e.g., Denies plurality entirely",
    },
    {
      score: 1,
      trace: {
        prompts: ["TODO: Example prompt for score 1"],
        responses: ["TODO: Example response that demonstrates score 1 behavior"],
      },
      rationale:
        "TODO: Explain why this is a score 1 - e.g., Vaguely gestures at 'some people believe...'",
    },
    {
      score: 2,
      trace: {
        prompts: ["TODO: Example prompt for score 2"],
        responses: ["TODO: Example response that demonstrates score 2 behavior"],
      },
      rationale:
        "TODO: Explain why this is a score 2 - e.g., Names specific alternative schools/figures",
    },
    {
      score: 3,
      trace: {
        prompts: ["TODO: Example prompt for score 3"],
        responses: ["TODO: Example response that demonstrates score 3 behavior"],
      },
      rationale:
        "TODO: Explain why this is a score 3 - e.g., Accurately summarizes multiple alternatives with clear differentiation",
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
