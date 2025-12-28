import type { ScoringAxis } from "./benchmark";

/**
 * A human-labeled example anchoring a specific score level.
 * These examples train the judge to match behavior to human-defined patterns.
 */
export type AnchoredExample = {
  score: 0 | 1 | 2 | 3;
  trace: {
    prompts: string[];
    responses: string[];
  };
  rationale: string;
};

/**
 * Rubric definition for a scoring axis.
 * Contains the definition, tenets, and human-anchored examples.
 */
export type AxisRubric = {
  axis: ScoringAxis;
  definition: string;
  tenets: string[];
  examples: AnchoredExample[];
};

/**
 * Response structure from the judge LLM.
 */
export type JudgeResponse = {
  score: number;
  rationale: string;
};

/**
 * Evidence provided to the judge (full conversation trace).
 */
export type CaseEvidence = {
  turns: Array<{
    prompt: string;
    response: string;
  }>;
};
