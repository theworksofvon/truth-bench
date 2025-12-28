import { OpenAI } from "openai";
import type { Message } from "../types/execution";
import type { ModelAdapter } from "../runner/runTurn";

export const openRouterAdapter = (model: string): ModelAdapter => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key not provided. Set OPENROUTER_API_KEY environment variable.");
  }

  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    defaultHeaders: {
      "HTTP-Referer": "https://github.com/truth-benchmark/truth-benchmark",
      "X-Title": "Truth Benchmark",
    },
  });

  return async (messages: Message[]): Promise<string> => {
    try {
      const completion = await client.chat.completions.create({
        model: model,
        messages: messages,
      });

      const choice = completion.choices[0];
      if (!choice?.message?.content) {
        throw new Error("No content in response from OpenRouter API");
      }

      return choice.message.content;
    } catch (error) {
      throw new Error(`OpenRouter request failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
};
