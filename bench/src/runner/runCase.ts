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
    // Calculate actual turns based on available followups
    const followupCount = benchCase.followups?.length ?? 0;
    const actualTurns = Math.min(executionPlan.expectedTurns, 1 + followupCount);

    for (let i = 0; i < actualTurns; i++) {
      const turnMessages = assemblePrompt(benchCase, i);

      // Skip if no messages for this turn
      if (turnMessages.messages.length === 0) {
        break;
      }

      // Build full conversation history for this turn
      const fullConversation: Conversation = {
        messages: [...messages, ...turnMessages.messages],
        constraints: turnMessages.constraints,
      };

      const assistantMessage = await runTurn(fullConversation, modelAdapter);

      messages.push(...turnMessages.messages);
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
