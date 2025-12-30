import type { CaseScores } from "../types/scoring";
import type { BenchmarkCase, Domain } from "../types/benchmark";
import type { AggregateByDomain } from "../types/results";

/**
 * Calculate total score for a case by averaging its axis scores.
 */
const calculateCaseTotal = (caseScore: CaseScores): number => {
  if (caseScore.scores.length === 0) return 0;
  const sum = caseScore.scores.reduce((acc, s) => acc + s.value, 0);
  return sum / caseScore.scores.length;
};

export const aggregateByDomain = (
  caseScores: CaseScores[],
  cases: BenchmarkCase[]
): AggregateByDomain[] => {
  const domains: Domain[] = [
    "cosmology",
    "history",
    "biology",
    "psychology",
    "metaphysics",
  ];

  return domains
    .map((domain) => {
      const domainCases = cases.filter((c) => c.domain === domain);
      const domainScores = caseScores.filter((s) =>
        domainCases.some((c) => c.id === s.caseId)
      );

      if (domainScores.length === 0) {
        return null;
      }

      return {
        domain,
        caseCount: domainScores.length,
        averageScore:
          domainScores.reduce((sum, s) => sum + calculateCaseTotal(s), 0) /
          domainScores.length,
      };
    })
    .filter((result): result is AggregateByDomain => result !== null);
};
