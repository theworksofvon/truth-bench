import type { BenchmarkCase } from "../types/benchmark";
import type { ExecutionPlan } from "../types/execution";
import { createExecutionPlan } from "./executionPlans";

export const dispatchCase = (benchCase: BenchmarkCase): ExecutionPlan => {
  return createExecutionPlan(benchCase.task_type);
};
