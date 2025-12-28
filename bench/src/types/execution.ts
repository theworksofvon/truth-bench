import type { BenchmarkCase } from "./benchmark";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type Conversation = {
  messages: Message[];
  constraints?: string[];
};

export type ExecutionPlan = {
  strategy: "single_turn" | "multi_turn";
  expectedTurns: number;
};

export type CaseExecution = {
  caseId: string;
  conversation: Conversation;
  responses: string[];
  completed: boolean;
  error?: string;
};
