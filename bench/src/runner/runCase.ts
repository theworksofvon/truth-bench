import type { BenchmarkCase } from "../types/benchmark";
import type { ExecutionPlan, Conversation, Message } from "../types/execution";
import type { CaseExecution } from "../types/execution";
import { assemblePrompt } from "./assemblePrompt";
import { runTurn } from "./runTurn";
import type { ModelAdapter } from "./runTurn";

export const runCase = async (
  benchCase: BenchmarkCase,
  executionPlan: ExecutionPlan,
  modelAdapter: ModelAdapter
): Promise<CaseExecution> => {
  const responses: string[] = [];
  const messages: Message[] = [];

  try {
    for (let i = 0; i < executionPlan.expectedTurns; i++) {
      const conversation = assemblePrompt(benchCase, i);

      messages.push(...conversation.messages);

      const assistantMessage = await runTurn(conversation, modelAdapter);
      messages.push(assistantMessage);
      responses.push(assistantMessage.content);
    }

    return {
      caseId: benchCase.id,
      conversation: {
        messages,
        constraints: benchCase.constraints,
      },
      responses,
      completed: true,
    };
  } catch (error) {
    return {
      caseId: benchCase.id,
      conversation: {
        messages,
        constraints: benchCase.constraints,
      },
      responses,
      completed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
