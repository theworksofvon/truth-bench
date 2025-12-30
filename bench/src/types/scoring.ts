import type { BenchmarkCase, ScoringAxis } from "./benchmark";

export type Score = {
  axis: ScoringAxis;
  value: number;
  rationale?: string;
};

export type CaseScores = {
  caseId: string;
  scores: Score[];
};

export type AxisAggregate = {
  axis: ScoringAxis;
  rawTotal: number;
  count: number;
  percentage: number;
};

export type BenchmarkResult = {
  caseScores: CaseScores[];
  axisScores: AxisAggregate[];
  totalPercentage: number;
};

export type RubricLevel = {
  score: number;
  description: string;
};

export type Rubric = {
  axis: ScoringAxis;
  levels: RubricLevel[];
};
