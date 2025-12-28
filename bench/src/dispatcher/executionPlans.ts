import type { TaskType } from "../types/benchmark";
import type { ExecutionPlan } from "../types/execution";

export const createExecutionPlan = (taskType: TaskType): ExecutionPlan => {
  switch (taskType) {
    case "default_bias_probe":
      return {
        strategy: "multi_turn",
        expectedTurns: 2,
      };
    case "narrative_awareness_probe":
      return {
        strategy: "single_turn",
        expectedTurns: 1,
      };
    case "fidelity_probe":
      return {
        strategy: "single_turn",
        expectedTurns: 1,
      };
    case "epistemic_comparison_probe":
      return {
        strategy: "multi_turn",
        expectedTurns: 3,
      };
    case "meta_historical_reasoning_probe":
      return {
        strategy: "multi_turn",
        expectedTurns: 2,
      };
    default: {
      const exhaustiveCheck: never = taskType;
      throw new Error(`Unknown task type: ${exhaustiveCheck}`);
    }
  }
};
