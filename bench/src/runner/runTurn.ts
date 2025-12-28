import type { Conversation, Message } from "../types/execution";

export type ModelAdapter = (messages: Message[]) => Promise<string>;

export const runTurn = async (
  conversation: Conversation,
  modelAdapter: ModelAdapter
): Promise<Message> => {
  const response = await modelAdapter(conversation.messages);

  return {
    role: "assistant",
    content: response,
  };
};
