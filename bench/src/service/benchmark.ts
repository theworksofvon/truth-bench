import type { BenchmarkCase, Domain, TaskType } from "../types/benchmark";
import { cosmologyCases } from "../cases/cosmology";
import { historyCases } from "../cases/history";
import { biologyCases } from "../cases/biology";
import { psychologyCases } from "../cases/psychology";
import { metaphysicsCases } from "../cases/metaphysics";
import { dispatchCase } from "../dispatcher/dispatch";
import { runCase } from "../runner/runCase";
import { scoreCase } from "../scoring/scoreCase";
import { aggregateResults } from "../analytics/aggregate";
import * as byDomain from "../analytics/byDomain";
import * as byAxis from "../analytics/byAxis";
import type { ModelAdapter } from "../runner/runTurn";
import type { BenchmarkResults, AggregateByDomain, AggregateByAxis } from "../types/results";
import { defaultModels } from "../models/providers";

export const getAllCases = (): BenchmarkCase[] => {
  return [
    ...cosmologyCases,
    ...historyCases,
    ...biologyCases,
    ...psychologyCases,
    ...metaphysicsCases,
  ];
};

export const filterCases = (
  cases: BenchmarkCase[],
  options: {
    domains?: Domain[];
    cases?: string[];
    taskTypes?: TaskType[];
  }
): BenchmarkCase[] => {
  let filtered = [...cases];

  if (options.domains && options.domains.length > 0) {
    filtered = filtered.filter((c) => options.domains!.includes(c.domain));
  }

  if (options.cases && options.cases.length > 0) {
    filtered = filtered.filter((c) => options.cases!.includes(c.id));
  }

  if (options.taskTypes && options.taskTypes.length > 0) {
    filtered = filtered.filter((c) => options.taskTypes!.includes(c.task_type));
  }

  return filtered;
};

export const runBenchmark = async (
  cases: BenchmarkCase[],
  modelAdapter: ModelAdapter,
  modelName: string
): Promise<{
  results: BenchmarkResults;
  domainAggregates: AggregateByDomain[];
  axisAggregates: AggregateByAxis[];
}> => {
  const modelLabel = `[${modelName}] `;
  console.log(`${modelLabel}Running benchmark with ${cases.length} case(s)...\n`);

  const caseScores = [];

  for (const benchCase of cases) {
    console.log(`${modelLabel}Running case: ${benchCase.id}`);
    console.log(`${modelLabel}Domain: ${benchCase.domain}`);
    console.log(`${modelLabel}Task type: ${benchCase.task_type}\n`);

    const executionPlan = dispatchCase(benchCase);
    console.log(`${modelLabel}Execution plan: ${JSON.stringify(executionPlan)}`);

    const execution = await runCase(benchCase, executionPlan, modelAdapter);

    if (!execution.completed) {
      const errorMsg = `${modelLabel}Case ${benchCase.id} failed: ${execution.error}`;
      console.error(errorMsg);
      continue;
    }

    const scores = await scoreCase(benchCase, execution);

    console.log(`${modelLabel}Scores for ${benchCase.id}:`);
    for (const score of scores.scores) {
      console.log(`${modelLabel}  - ${score.axis}: ${score.value} (${score.rationale})`);
    }
    console.log(`${modelLabel}  Total: ${scores.totalScore}\n`);

    caseScores.push(scores);
  }

  const results = aggregateResults(caseScores);
  console.log(`\n${modelLabel}=== BENCHMARK RESULTS ===`);
  console.log(`${modelLabel}Total cases: ${results.summary.totalCases}`);
  console.log(`${modelLabel}Average score: ${results.summary.averageScore.toFixed(2)}\n`);

  const domainAggregates = byDomain.aggregateByDomain(caseScores, cases);
  if (domainAggregates.length > 0) {
    console.log(`${modelLabel}=== BY DOMAIN ===`);
    for (const agg of domainAggregates) {
      console.log(`${modelLabel}${agg.domain}: ${agg.averageScore.toFixed(2)} (${agg.caseCount} cases)`);
    }
  }

  const axisAggregates = byAxis.aggregateByAxis(caseScores, cases);
  if (axisAggregates.length > 0) {
    console.log(`\n${modelLabel}=== BY SCORING AXIS ===`);
    for (const agg of axisAggregates) {
      console.log(`${modelLabel}${agg.axis}: ${agg.averageScore.toFixed(2)} (${agg.caseCount} cases)`);
    }
  }

  return {
    results,
    domainAggregates,
    axisAggregates,
  };
};

export const runAllBenchmarks = async () => {
  const cases = getAllCases();

  if (cases.length === 0) {
    throw new Error("No benchmark cases found. Add cases to src/cases/ directory.");
  }

  const modelKeys = Object.keys(defaultModels);

  if (modelKeys.length === 0) {
    throw new Error("No models configured in defaultModels.");
  }

  const allResults: Array<{
    modelName: string;
    results: BenchmarkResults;
    domainAggregates: AggregateByDomain[];
    axisAggregates: AggregateByAxis[];
    error?: string;
  }> = [];

  for (const modelKey of modelKeys) {
    const modelAdapter = defaultModels[modelKey];

    if (!modelAdapter) {
      console.error(`Model "${modelKey}" not found. Skipping.`);
      continue;
    }

    try {
      console.log(`[${modelKey}] Running benchmark...`);
      const benchmarkResult = await runBenchmark(cases, modelAdapter, modelKey);
      allResults.push({
        modelName: modelKey,
        results: benchmarkResult.results,
        domainAggregates: benchmarkResult.domainAggregates,
        axisAggregates: benchmarkResult.axisAggregates,
      });
      console.log(`[${modelKey}] Completed`);
    } catch (error) {
      const errorMsg = `[${modelKey}] Benchmark failed: ${error instanceof Error ? error.message : String(error)}`;
      console.error(errorMsg);
      allResults.push({
        modelName: modelKey,
        results: {
          caseResults: [],
          summary: { totalCases: 0, averageScore: 0 },
        },
        domainAggregates: [],
        axisAggregates: [],
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const summary = allResults
    .filter((r) => !r.error)
    .map((r) => ({
      modelName: r.modelName,
      totalCases: r.results.summary.totalCases,
      averageScore: r.results.summary.averageScore,
    }));

  return {
    models: allResults,
    summary,
    timestamp: new Date().toISOString(),
  };
};

