import type { CaseScores } from "./scoring";
import type { Domain, ScoringAxis } from "./benchmark";

export type BenchmarkResults = {
  caseResults: CaseScores[];
  summary: {
    totalCases: number;
    averageScore: number;
  };
};

export type AggregateByDomain = {
  domain: Domain;
  caseCount: number;
  averageScore: number;
};

export type AggregateByAxis = {
  axis: ScoringAxis;
  caseCount: number;
  averageScore: number;
};
