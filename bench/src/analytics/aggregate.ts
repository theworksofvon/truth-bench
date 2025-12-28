import type { CaseScores } from "../types/scoring";
import type { BenchmarkResults } from "../types/results";

export const aggregateResults = (caseResults: CaseScores[]): BenchmarkResults => {
  const totalCases = caseResults.length;
  const averageScore =
    totalCases > 0
      ? caseResults.reduce((sum, r) => sum + r.totalScore, 0) / totalCases
      : 0;

  return {
    caseResults,
    summary: {
      totalCases,
      averageScore,
    },
  };
};
