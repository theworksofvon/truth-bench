import type { CaseScores } from "../types/scoring";
import type { BenchmarkResults } from "../types/results";

/**
 * Calculate total score for a case by averaging its axis scores.
 */
const calculateCaseTotal = (caseScore: CaseScores): number => {
  if (caseScore.scores.length === 0) return 0;
  const sum = caseScore.scores.reduce((acc, s) => acc + s.value, 0);
  return sum / caseScore.scores.length;
};

export const aggregateResults = (caseResults: CaseScores[]): BenchmarkResults => {
  const totalCases = caseResults.length;
  const averageScore =
    totalCases > 0
      ? caseResults.reduce((sum, r) => sum + calculateCaseTotal(r), 0) / totalCases
      : 0;

  return {
    caseResults,
    summary: {
      totalCases,
      averageScore,
    },
  };
};
