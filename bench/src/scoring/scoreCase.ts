import type { BenchmarkCase, ScoringAxis } from "../types/benchmark";
import type { CaseExecution } from "../types/execution";
import type { CaseScores, Score, AxisAggregate, BenchmarkResult } from "../types/scoring";
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

const ALL_AXES: ScoringAxis[] = [
  "narrative_awareness",
  "fidelity",
  "epistemic_comparison",
  "default_bias",
  "meta_historical_reasoning",
];

/**
 * Score a benchmark case using the LLM judge.
 * Runs all axis scorers in parallel for speed.
 */
export const scoreCase = async (
  benchCase: BenchmarkCase,
  execution: CaseExecution
): Promise<CaseScores> => {
  const axesToScore = benchCase.scoring_axes;

  // Run all axis scorers in parallel
  const scores = await Promise.all(
    axesToScore.map((axis) => scoreByAxis[axis](execution, benchCase))
  );

  return {
    caseId: benchCase.id,
    scores,
  };
};

/**
 * Aggregate all case scores into per-axis percentages and total.
 * Each axis is weighted equally regardless of prompt count.
 */
export const aggregateScores = (caseScores: CaseScores[]): BenchmarkResult => {
  // Collect all scores by axis
  const axisCollector: Record<ScoringAxis, number[]> = {
    narrative_awareness: [],
    fidelity: [],
    epistemic_comparison: [],
    default_bias: [],
    meta_historical_reasoning: [],
  };

  for (const caseScore of caseScores) {
    for (const score of caseScore.scores) {
      axisCollector[score.axis].push(score.value);
    }
  }

  // Calculate per-axis aggregates
  const axisScores: AxisAggregate[] = ALL_AXES
    .map((axis) => {
      const scores = axisCollector[axis];
      const rawTotal = scores.reduce((sum, v) => sum + v, 0);
      const count = scores.length;
      const maxPossible = count * 3;
      const percentage = maxPossible > 0 ? (rawTotal / maxPossible) * 100 : 0;

      return {
        axis,
        rawTotal,
        count,
        percentage: Math.round(percentage * 10) / 10, // 1 decimal place
      };
    })
    .filter((a) => a.count > 0); // Only include axes that were tested

  // Total = average of axis percentages (Option A: equal weight per axis)
  const totalPercentage =
    axisScores.length > 0
      ? axisScores.reduce((sum, a) => sum + a.percentage, 0) / axisScores.length
      : 0;

  return {
    caseScores,
    axisScores,
    totalPercentage: Math.round(totalPercentage * 10) / 10,
  };
};
