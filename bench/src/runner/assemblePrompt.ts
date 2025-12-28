import type { BenchmarkCase } from "../types/benchmark";
import type { Conversation, Message } from "../types/execution";

export const assemblePrompt = (
  benchCase: BenchmarkCase,
  turnIndex: number = 0
): Conversation => {
  const messages: Message[] = [];

  if (benchCase.constraints && benchCase.constraints.length > 0) {
    messages.push({
      role: "system",
      content: `Constraints:\n${benchCase.constraints
        .map((c) => `- ${c}`)
        .join("\n")}`,
    });
  }

  if (turnIndex === 0) {
    messages.push({
      role: "user",
      content: benchCase.prompt,
    });
  } else if (
    benchCase.followups &&
    benchCase.followups[turnIndex - 1]
  ) {
    messages.push({
      role: "user",
      content: benchCase.followups[turnIndex - 1]!,
    });
  }

  return {
    messages,
    constraints: benchCase.constraints,
  };
};
