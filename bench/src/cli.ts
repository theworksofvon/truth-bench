import * as p from "@clack/prompts";
import color from "picocolors";
import type { Domain, TaskType } from "./types/benchmark";
import { defaultModels } from "./models/providers";
import { getAllCases, filterCases, runBenchmark, type ProgressCallback } from "./service/benchmark";
import type { BenchmarkResults } from "./types/results";

// Convert 0-3 score to percentage (0-100)
const toPercent = (score: number): number => (score / 3) * 100;

const main = async () => {
  console.clear();

  p.intro(color.bgCyan(color.black(" Truth Benchmark ")));

  const allCases = getAllCases();

  if (allCases.length === 0) {
    p.cancel("No benchmark cases found. Add cases to src/cases/ directory.");
    process.exit(1);
  }

  const modelKeys = Object.keys(defaultModels);

  if (modelKeys.length === 0) {
    p.cancel("No models configured in defaultModels.");
    process.exit(1);
  }

  // Model selection
  const selectedModels = await p.multiselect({
    message: "Select models to benchmark",
    options: modelKeys.map((key) => ({
      value: key,
      label: key,
    })),
    required: true,
  });

  if (p.isCancel(selectedModels)) {
    p.cancel("Benchmark cancelled.");
    process.exit(0);
  }

  // Domain filter
  const domains: Domain[] = ["cosmology", "history", "biology", "psychology", "metaphysics"];
  const domainFilter = await p.multiselect({
    message: "Filter by domains (press Enter to skip)",
    options: domains.map((d) => ({
      value: d,
      label: d.charAt(0).toUpperCase() + d.slice(1),
      hint: `${allCases.filter((c) => c.domain === d).length} cases`,
    })),
    required: false,
  });

  if (p.isCancel(domainFilter)) {
    p.cancel("Benchmark cancelled.");
    process.exit(0);
  }

  const selectedDomains = (domainFilter || []) as Domain[];

  // Task type filter
  const taskTypes: TaskType[] = [
    "default_bias_probe",
    "narrative_awareness_probe",
    "fidelity_probe",
    "epistemic_comparison_probe",
    "meta_historical_reasoning_probe",
  ];

  const taskTypeFilter = await p.multiselect({
    message: "Filter by task types (press Enter to skip)",
    options: taskTypes.map((t) => ({
      value: t,
      label: t.replace(/_/g, " ").replace("probe", "").trim(),
    })),
    required: false,
  });

  if (p.isCancel(taskTypeFilter)) {
    p.cancel("Benchmark cancelled.");
    process.exit(0);
  }

  const selectedTaskTypes = (taskTypeFilter || []) as TaskType[];

  // Filter cases
  const filteredCases = filterCases(allCases, {
    domains: selectedDomains.length > 0 ? selectedDomains : undefined,
    taskTypes: selectedTaskTypes.length > 0 ? selectedTaskTypes : undefined,
  });

  if (filteredCases.length === 0) {
    p.cancel("No cases match the selected filters.");
    process.exit(1);
  }

  // Run all or select specific cases
  const runMode = await p.select({
    message: `Found ${color.cyan(filteredCases.length.toString())} cases. How would you like to proceed?`,
    options: [
      { value: "all", label: "Run all cases", hint: "recommended" },
      { value: "select", label: "Select specific cases" },
    ],
  });

  if (p.isCancel(runMode)) {
    p.cancel("Benchmark cancelled.");
    process.exit(0);
  }

  let selectedCases = filteredCases;

  if (runMode === "select") {
    const caseSelection = await p.multiselect({
      message: "Select cases to run",
      options: filteredCases.map((c) => ({
        value: c.id,
        label: c.id,
        hint: `${c.domain} · ${c.task_type.replace(/_/g, " ")}`,
      })),
      required: true,
    });

    if (p.isCancel(caseSelection)) {
      p.cancel("Benchmark cancelled.");
      process.exit(0);
    }

    selectedCases = filteredCases.filter((c) => (caseSelection as string[]).includes(c.id));
  }

  // Summary
  p.note(
    [
      `${color.cyan("Models:")} ${(selectedModels as string[]).join(", ")}`,
      `${color.cyan("Cases:")} ${selectedCases.length}`,
      selectedDomains.length > 0 ? `${color.cyan("Domains:")} ${selectedDomains.join(", ")}` : null,
      selectedTaskTypes.length > 0
        ? `${color.cyan("Task Types:")} ${selectedTaskTypes.map((t) => t.replace(/_/g, " ")).join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n"),
    "Configuration"
  );

  // Confirm
  const confirmed = await p.confirm({
    message: "Start benchmark?",
    initialValue: true,
  });

  if (p.isCancel(confirmed) || !confirmed) {
    p.cancel("Benchmark cancelled.");
    process.exit(0);
  }

  // Run benchmarks
  const allResults: Array<{
    modelName: string;
    results: BenchmarkResults;
  }> = [];

  for (const modelKey of selectedModels as string[]) {
    const modelAdapter = defaultModels[modelKey];

    if (!modelAdapter) {
      p.log.error(`Model "${modelKey}" not found. Skipping.`);
      continue;
    }

    p.log.step(`Running benchmark for ${color.cyan(modelKey)}`);

    const s = p.spinner();
    s.start(`[0/${selectedCases.length}] Starting...`);

    let failedCount = 0;

    const onProgress: ProgressCallback = (info) => {
      if (info.status === "running") {
        s.message(`[${info.current}/${info.total}] Running ${color.cyan(info.caseId)}...`);
      } else if (info.status === "completed") {
        const scoreStr = info.score !== undefined ? ` ${color.green(`(${toPercent(info.score).toFixed(0)}%)`)}` : "";
        s.message(`[${info.current}/${info.total}] ${color.green("✓")} ${info.caseId}${scoreStr}`);
      } else if (info.status === "failed") {
        failedCount++;
        s.message(`[${info.current}/${info.total}] ${color.red("✗")} ${info.caseId}: ${info.error}`);
      }
    };

    try {
      // Temporarily suppress console.log during benchmark
      const originalLog = console.log;
      const originalError = console.error;
      console.log = () => {};
      console.error = () => {};

      const benchmarkResult = await runBenchmark(selectedCases, modelAdapter, modelKey, onProgress);

      // Restore console
      console.log = originalLog;
      console.error = originalError;

      const statusIcon = failedCount > 0 ? color.yellow("⚠") : color.green("✓");
      const failedMsg = failedCount > 0 ? ` (${failedCount} failed)` : "";
      s.stop(`${statusIcon} Completed ${modelKey}${failedMsg}`);

      // Show results summary
      const avgPercent = toPercent(benchmarkResult.results.summary.averageScore);
      p.log.info(
        `Average score: ${color.yellow(`${avgPercent.toFixed(0)}%`)} across ${benchmarkResult.results.summary.totalCases} cases`
      );

      // Show domain breakdown if available
      if (benchmarkResult.domainAggregates.length > 0) {
        const domainSummary = benchmarkResult.domainAggregates
          .map((d) => `${d.domain}: ${toPercent(d.averageScore).toFixed(0)}%`)
          .join(" · ");
        p.log.info(`By domain: ${domainSummary}`);
      }

      // Show axis breakdown if available
      if (benchmarkResult.axisAggregates.length > 0) {
        const axisSummary = benchmarkResult.axisAggregates
          .map((a) => `${a.axis.replace(/_/g, " ")}: ${toPercent(a.averageScore).toFixed(0)}%`)
          .join(" · ");
        p.log.info(`By axis: ${axisSummary}`);
      }

      // Show output file location
      p.log.success(`Results saved to: ${color.cyan(benchmarkResult.outputFile)}`);

      allResults.push({ modelName: modelKey, results: benchmarkResult.results });
    } catch (error) {
      s.stop(`${color.red("✗")} Failed: ${modelKey}`);
      p.log.error(error instanceof Error ? error.message : String(error));
    }
  }

  // Final summary
  if (allResults.length > 0) {
    const summaryLines = allResults.map(({ modelName, results }) => {
      const percent = toPercent(results.summary.averageScore);
      const barLength = Math.round(percent / 100 * 30);
      const bar = "█".repeat(barLength);
      const emptyBar = "░".repeat(30 - barLength);
      return `${modelName.padEnd(20)} ${bar}${emptyBar} ${percent.toFixed(0)}%`;
    });

    p.note(summaryLines.join("\n"), "Final Results");
  }

  p.outro(color.green("Benchmark complete!"));
};

main().catch((error) => {
  p.cancel(`Benchmark failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
