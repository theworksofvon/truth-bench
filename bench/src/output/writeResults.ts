import * as fs from "fs";
import * as path from "path";
import type { BenchmarkCase } from "../types/benchmark";
import type { CaseExecution } from "../types/execution";
import type { CaseScores } from "../types/scoring";
import type { AggregateByDomain, AggregateByAxis } from "../types/results";

export type DetailedCaseResult = {
  case: {
    id: string;
    domain: string;
    task_type: string;
    prompt: string;
    followups?: string[];
    scoring_axes: string[];
  };
  execution: {
    messages: Array<{ role: string; content: string }>;
    responses: string[];
    completed: boolean;
    error?: string;
  };
  scoring: {
    scores: Array<{
      axis: string;
      value: number;
      percentage: number;
      rationale?: string;
    }>;
    averageScore: number;
    averagePercentage: number;
  };
};

export type DetailedBenchmarkOutput = {
  metadata: {
    modelName: string;
    timestamp: string;
    totalCases: number;
    completedCases: number;
    failedCases: number;
  };
  summary: {
    averageScore: number;
    averagePercentage: number;
    byDomain: Array<{
      domain: string;
      averageScore: number;
      averagePercentage: number;
      caseCount: number;
    }>;
    byAxis: Array<{
      axis: string;
      averageScore: number;
      averagePercentage: number;
      caseCount: number;
    }>;
  };
  cases: DetailedCaseResult[];
};

const toPercent = (score: number): number => (score / 3) * 100;

export const buildDetailedOutput = (
  modelName: string,
  cases: BenchmarkCase[],
  executions: Map<string, CaseExecution>,
  scores: Map<string, CaseScores>,
  domainAggregates: AggregateByDomain[],
  axisAggregates: AggregateByAxis[]
): DetailedBenchmarkOutput => {
  const detailedCases: DetailedCaseResult[] = [];
  let completedCount = 0;
  let failedCount = 0;

  for (const benchCase of cases) {
    const execution = executions.get(benchCase.id);
    const caseScores = scores.get(benchCase.id);

    if (!execution) {
      failedCount++;
      continue;
    }

    if (!execution.completed) {
      failedCount++;
    } else {
      completedCount++;
    }

    const scoresList = caseScores?.scores ?? [];
    const avgScore = scoresList.length > 0
      ? scoresList.reduce((sum, s) => sum + s.value, 0) / scoresList.length
      : 0;

    detailedCases.push({
      case: {
        id: benchCase.id,
        domain: benchCase.domain,
        task_type: benchCase.task_type,
        prompt: benchCase.prompt,
        followups: benchCase.followups,
        scoring_axes: benchCase.scoring_axes,
      },
      execution: {
        messages: execution.conversation.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        responses: execution.responses,
        completed: execution.completed,
        error: execution.error,
      },
      scoring: {
        scores: scoresList.map((s) => ({
          axis: s.axis,
          value: s.value,
          percentage: toPercent(s.value),
          rationale: s.rationale,
        })),
        averageScore: avgScore,
        averagePercentage: toPercent(avgScore),
      },
    });
  }

  // Calculate overall average
  const allScores = detailedCases
    .filter((c) => c.execution.completed)
    .map((c) => c.scoring.averageScore);
  const overallAvg = allScores.length > 0
    ? allScores.reduce((sum, s) => sum + s, 0) / allScores.length
    : 0;

  return {
    metadata: {
      modelName,
      timestamp: new Date().toISOString(),
      totalCases: cases.length,
      completedCases: completedCount,
      failedCases: failedCount,
    },
    summary: {
      averageScore: overallAvg,
      averagePercentage: toPercent(overallAvg),
      byDomain: domainAggregates.map((d) => ({
        domain: d.domain,
        averageScore: d.averageScore,
        averagePercentage: toPercent(d.averageScore),
        caseCount: d.caseCount,
      })),
      byAxis: axisAggregates.map((a) => ({
        axis: a.axis,
        averageScore: a.averageScore,
        averagePercentage: toPercent(a.averageScore),
        caseCount: a.caseCount,
      })),
    },
    cases: detailedCases,
  };
};

export const writeResultsToFile = (
  output: DetailedBenchmarkOutput,
  outputDir: string = "output"
): string => {
  // Ensure output directory exists
  const fullPath = path.resolve(outputDir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  // Generate filename with timestamp and model name
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeModelName = output.metadata.modelName.replace(/[^a-zA-Z0-9-]/g, "_");
  const filename = `${timestamp}_${safeModelName}.json`;
  const filepath = path.join(fullPath, filename);

  // Write the file
  fs.writeFileSync(filepath, JSON.stringify(output, null, 2));

  return filepath;
};
