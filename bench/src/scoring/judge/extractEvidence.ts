import type { CaseExecution } from "../../types/execution";
import type { CaseEvidence } from "../../types/judge";

/**
 * Extract case evidence (prompt/response pairs) from a case execution.
 * Pairs user messages with subsequent assistant responses.
 */
export const extractEvidence = (execution: CaseExecution): CaseEvidence => {
  const turns: CaseEvidence["turns"] = [];
  const messages = execution.conversation.messages;

  let currentPrompt: string | null = null;

  for (const msg of messages) {
    if (msg.role === "user") {
      currentPrompt = msg.content;
    } else if (msg.role === "assistant" && currentPrompt) {
      turns.push({
        prompt: currentPrompt,
        response: msg.content,
      });
      currentPrompt = null;
    }
  }

  return { turns };
};
