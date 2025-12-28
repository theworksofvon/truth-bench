import type { BenchmarkCase, ScoringAxis } from "../types/benchmark";
import type { CaseExecution } from "../types/execution";
import type { CaseScores, Score } from "../types/scoring";
import { scoreNarrativeAwareness } from "./axes/narrativeAwareness";
import { scoreFidelity } from "./axes/fidelity";
import { scoreEpistemicComparison } from "./axes/epistemicComparison";
import { scoreDefaultBias } from "./axes/defaultBias";
import { scoreMetaHistorical } from "./axes/metaHistorical";

/**
 * Async axis scorer type that receives full execution context.
 */
type AxisScorer = (
  execution: CaseExecution,
  benchCase: BenchmarkCase
) => Promise<Score>;

const scoreByAxis: Record<ScoringAxis, AxisScorer> = {
  narrative_awareness: scoreNarrativeAwareness,
  fidelity: scoreFidelity,
  epistemic_comparison: scoreEpistemicComparison,
  default_bias: scoreDefaultBias,
  meta_historical_reasoning: scoreMetaHistorical,
};

/**
 * Score a benchmark case using the LLM judge.
 * Runs axis scorers sequentially to avoid rate limiting.
 */
export const scoreCase = async (
  benchCase: BenchmarkCase,
  execution: CaseExecution
): Promise<CaseScores> => {
  const scoresToRun = benchCase.scoring_axes.filter((axis) =>
    benchCase.scoring_axes.includes(axis)
  );

  // Run scorers sequentially to avoid rate limiting
  const scores: Score[] = [];
  for (const axis of scoresToRun) {
    const score = await scoreByAxis[axis](execution, benchCase);
    scores.push(score);
  }

  const totalScore =
    scores.length > 0
      ? scores.reduce((sum, score) => sum + score.value, 0) / scores.length
      : 0;

  return {
    caseId: benchCase.id,
    scores,
    totalScore,
  };
};
