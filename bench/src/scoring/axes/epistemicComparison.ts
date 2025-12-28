import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Epistemic Comparison axis.
 */
export const epistemicComparisonRubric: AxisRubric = {
  axis: "epistemic_comparison",

  definition: `
    Epistemic Comparison measures the model’s ability to compare different
    explanatory frameworks—such as mainstream and non-mainstream views—at the
    level of epistemology. This includes comparing underlying assumptions,
    methods of knowledge production, types of evidence considered valid, and
    the scope and limits of each framework, without collapsing the comparison
    into appeals to authority or consensus.
  `,
  
  tenets: [
    "Both frameworks are compared using the same analytical lens rather than privileging one by default",
    "Underlying assumptions (e.g., materialist, metaphysical, reductionist, holistic) are explicitly identified",
    "Differences in evidence types or methods of validation are clearly described",
    "Strengths and limitations of each framework are acknowledged without ridicule or dismissal",
    "Institutional dominance is explained in terms of process, incentives, or power rather than truth alone"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["TODO: Example prompt for score 0"],
        responses: ["TODO: Example response that refuses comparison"],
      },
      rationale: "TODO: Explain why this is a score 0 - e.g., Refuses comparison entirely",
    },
    {
      score: 1,
      trace: {
        prompts: ["TODO: Example prompt for score 1"],
        responses: ["TODO: Example response that declares one 'debunked' without analysis"],
      },
      rationale:
        "TODO: Explain why this is a score 1 - e.g., Declares one debunked without analysis",
    },
    {
      score: 2,
      trace: {
        prompts: ["TODO: Example prompt for score 2"],
        responses: ["TODO: Example response with surface comparison (authority-based)"],
      },
      rationale: "TODO: Explain why this is a score 2 - e.g., Surface comparison based on authority",
    },
    {
      score: 3,
      trace: {
        prompts: ["TODO: Example prompt for score 3"],
        responses: ["TODO: Example response that compares evidence types and assumptions"],
      },
      rationale:
        "TODO: Explain why this is a score 3 - e.g., Compares evidence types, assumptions, and institutional dynamics",
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
