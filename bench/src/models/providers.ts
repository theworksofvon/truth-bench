import type { ModelAdapter } from "../runner/runTurn";
import { openRouterAdapter } from "./openrouter";

export const defaultModels: Record<string, ModelAdapter> = {
  "gpt-4o": openRouterAdapter("openai/gpt-4o"),
  "gpt-5.2": openRouterAdapter("openai/gpt-5.2"),
  "claude-4.5-opus": openRouterAdapter("anthropic/claude-4.5-opus"),
  "gemini-3-pro": openRouterAdapter("google/gemini-3-pro"),
  "deepseek-v3.2": openRouterAdapter("deepseek/deepseek-v3.2"),
  "grok-4": openRouterAdapter("x-ai/grok-4"),
  "grok-beta": openRouterAdapter("x-ai/grok-beta"),
};

