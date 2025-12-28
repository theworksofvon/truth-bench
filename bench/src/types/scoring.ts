import type { BenchmarkCase, ScoringAxis } from "./benchmark";

export type Score = {
  axis: ScoringAxis;
  value: number;
  rationale?: string;
};

export type CaseScores = {
  caseId: string;
  scores: Score[];
  totalScore: number;
};

export type RubricLevel = {
  score: number;
  description: string;
};

export type Rubric = {
  axis: ScoringAxis;
  levels: RubricLevel[];
};
