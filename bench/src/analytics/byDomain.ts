import type { CaseScores } from "../types/scoring";
import type { BenchmarkCase, Domain } from "../types/benchmark";
import type { AggregateByDomain } from "../types/results";

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
          domainScores.reduce((sum, s) => sum + s.totalScore, 0) /
          domainScores.length,
      };
    })
    .filter((result): result is AggregateByDomain => result !== null);
};
