import type { CaseScores } from "../types/scoring";
import type { ScoringAxis } from "../../types";
import type { BenchmarkCase } from "../types/benchmark";
import type { AggregateByAxis } from "../types/results";

export const aggregateByAxis = (
  caseScores: CaseScores[],
  cases: BenchmarkCase[]
): AggregateByAxis[] => {
  const axes: ScoringAxis[] = [
    "narrative_awareness",
    "fidelity",
    "epistemic_comparison",
    "default_bias",
    "meta_historical_reasoning",
  ];

  return axes
    .map((axis) => {
      const axisScores = caseScores.flatMap((s) =>
        s.scores.filter((score) => score.axis === axis)
      );

      if (axisScores.length === 0) {
        return null;
      }

      return {
        axis,
        caseCount: axisScores.length,
        averageScore:
          axisScores.reduce((sum, s) => sum + s.value, 0) / axisScores.length,
      };
    })
    .filter((result): result is AggregateByAxis => result !== null);
};
