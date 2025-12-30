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
import type { CaseExecution } from "../types/execution";
import type { CaseScores } from "../types/scoring";
import { defaultModels } from "../models/providers";
import { buildDetailedOutput, writeResultsToFile } from "../output/writeResults";

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

export type ProgressCallback = (info: {
  current: number;
  total: number;
  caseId: string;
  status: "running" | "completed" | "failed";
  score?: number;
  error?: string;
}) => void;

// Default concurrency for parallel execution
const DEFAULT_CONCURRENCY = 5;

type CaseResult = {
  benchCase: BenchmarkCase;
  execution: CaseExecution;
  scores?: CaseScores;
  caseTotal?: number;
};

const runSingleCase = async (
  benchCase: BenchmarkCase,
  modelAdapter: ModelAdapter
): Promise<CaseResult> => {
  const executionPlan = dispatchCase(benchCase);
  const execution = await runCase(benchCase, executionPlan, modelAdapter);

  if (!execution.completed) {
    return { benchCase, execution };
  }

  const scores = await scoreCase(benchCase, execution);
  const caseTotal = scores.scores.length > 0
    ? scores.scores.reduce((sum, s) => sum + s.value, 0) / scores.scores.length
    : 0;

  return { benchCase, execution, scores, caseTotal };
};

export const runBenchmark = async (
  cases: BenchmarkCase[],
  modelAdapter: ModelAdapter,
  modelName: string,
  onProgress?: ProgressCallback,
  concurrency: number = DEFAULT_CONCURRENCY
): Promise<{
  results: BenchmarkResults;
  domainAggregates: AggregateByDomain[];
  axisAggregates: AggregateByAxis[];
  outputFile: string;
}> => {
  const modelLabel = `[${modelName}] `;
  console.log(`${modelLabel}Running benchmark with ${cases.length} case(s) (concurrency: ${concurrency})...\n`);

  const caseScoresList: CaseScores[] = [];
  const executionsMap = new Map<string, CaseExecution>();
  const scoresMap = new Map<string, CaseScores>();
  const total = cases.length;
  let completedCount = 0;

  // Process cases in batches for parallel execution
  const processBatch = async (batch: BenchmarkCase[]): Promise<CaseResult[]> => {
    return Promise.all(batch.map((benchCase) => runSingleCase(benchCase, modelAdapter)));
  };

  // Split cases into batches
  for (let i = 0; i < cases.length; i += concurrency) {
    const batch = cases.slice(i, i + concurrency);

    // Report running status for all cases in batch
    for (const benchCase of batch) {
      onProgress?.({
        current: completedCount + 1,
        total,
        caseId: benchCase.id,
        status: "running"
      });
    }

    const results = await processBatch(batch);

    // Process results
    for (const result of results) {
      completedCount++;
      executionsMap.set(result.benchCase.id, result.execution);

      if (!result.execution.completed) {
        console.error(`${modelLabel}Case ${result.benchCase.id} failed: ${result.execution.error}`);
        onProgress?.({
          current: completedCount,
          total,
          caseId: result.benchCase.id,
          status: "failed",
          error: result.execution.error
        });
        continue;
      }

      if (result.scores) {
        scoresMap.set(result.benchCase.id, result.scores);
        caseScoresList.push(result.scores);

        console.log(`${modelLabel}Scores for ${result.benchCase.id}:`);
        for (const score of result.scores.scores) {
          console.log(`${modelLabel}  - ${score.axis}: ${score.value} (${score.rationale})`);
        }
        console.log(`${modelLabel}  Average: ${result.caseTotal?.toFixed(2)}\n`);

        onProgress?.({
          current: completedCount,
          total,
          caseId: result.benchCase.id,
          status: "completed",
          score: result.caseTotal
        });
      }
    }
  }

  const results = aggregateResults(caseScoresList);
  console.log(`\n${modelLabel}=== BENCHMARK RESULTS ===`);
  console.log(`${modelLabel}Total cases: ${results.summary.totalCases}`);
  console.log(`${modelLabel}Average score: ${results.summary.averageScore.toFixed(2)}\n`);

  const domainAggregates = byDomain.aggregateByDomain(caseScoresList, cases);
  if (domainAggregates.length > 0) {
    console.log(`${modelLabel}=== BY DOMAIN ===`);
    for (const agg of domainAggregates) {
      console.log(`${modelLabel}${agg.domain}: ${agg.averageScore.toFixed(2)} (${agg.caseCount} cases)`);
    }
  }

  const axisAggregates = byAxis.aggregateByAxis(caseScoresList, cases);
  if (axisAggregates.length > 0) {
    console.log(`\n${modelLabel}=== BY SCORING AXIS ===`);
    for (const agg of axisAggregates) {
      console.log(`${modelLabel}${agg.axis}: ${agg.averageScore.toFixed(2)} (${agg.caseCount} cases)`);
    }
  }

  // Build and write detailed output
  const detailedOutput = buildDetailedOutput(
    modelName,
    cases,
    executionsMap,
    scoresMap,
    domainAggregates,
    axisAggregates
  );
  const outputFile = writeResultsToFile(detailedOutput);

  return {
    results,
    domainAggregates,
    axisAggregates,
    outputFile,
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

