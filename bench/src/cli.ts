import prompts from "prompts";
import type { Domain, TaskType } from "./types/benchmark";
import type { ModelAdapter } from "./runner/runTurn";
import { defaultModels } from "./models/providers";
import { getAllCases, filterCases, runBenchmark } from "./service/benchmark";
import type { BenchmarkResults } from "./types/results";

const main = async () => {
  console.log("\n" + "=".repeat(80));
  console.log("TRUTH BENCHMARK CLI");
  console.log("=".repeat(80) + "\n");

  const allCases = getAllCases();

  if (allCases.length === 0) {
    console.log("No benchmark cases found. Add cases to src/cases/ directory.");
    return;
  }

  const modelKeys = Object.keys(defaultModels);

  if (modelKeys.length === 0) {
    console.error("No models configured in defaultModels.");
    process.exit(1);
  }

  // Select models
  const modelResponse = await prompts({
    type: "multiselect",
    name: "models",
    message: "Select models to run:",
    choices: modelKeys.map((key, index) => ({
      title: key,
      value: key,
      selected: index === 0,
    })),
    instructions: "Use arrow keys to navigate, space to select, enter to confirm",
  });

  if (!modelResponse.models || modelResponse.models.length === 0) {
    console.log("No models selected. Exiting.");
    return;
  }

  const selectedModels = modelResponse.models as string[];

  // Select domains (optional)
  const domains: Domain[] = ["cosmology", "history", "biology", "psychology", "metaphysics"];
  const domainResponse = await prompts({
    type: "multiselect",
    name: "domains",
    message: "Filter by domains (optional - select none to include all):",
    choices: [
      ...domains.map((domain, index) => ({
        title: domain,
        value: domain,
        selected: index === 0,
      })),
    ],
    instructions: "Use arrow keys to navigate, space to select, enter to confirm (or select none for all)",
  });

  const selectedDomains = (domainResponse.domains || []) as Domain[];

  // Select task types (optional)
  const taskTypes: TaskType[] = [
    "narrative_awareness_probe",
    "fidelity_probe",
    "epistemic_comparison_probe",
    "default_bias_probe",
    "meta_historical_reasoning_probe",
  ];
  const taskTypeResponse = await prompts({
    type: "multiselect",
    name: "taskTypes",
    message: "Filter by task types (optional - select none to include all):",
    choices: taskTypes.map((type, index) => ({
      title: type,
      value: type,
      selected: index === 0,
    })),
    instructions: "Use arrow keys to navigate, space to select, enter to confirm (or select none for all)",
  });

  const selectedTaskTypes = (taskTypeResponse.taskTypes || []) as TaskType[];

  // Filter cases
  const filteredByDomainAndType = filterCases(allCases, {
    domains: selectedDomains.length > 0 ? selectedDomains : undefined,
    taskTypes: selectedTaskTypes.length > 0 ? selectedTaskTypes : undefined,
  });

  if (filteredByDomainAndType.length === 0) {
    console.log("No cases match the selected filters. Exiting.");
    return;
  }

  // Select cases
  const caseResponse = await prompts({
    type: "multiselect",
    name: "cases",
    message: `Select cases to run (${filteredByDomainAndType.length} available):`,
    choices: filteredByDomainAndType.map((c, index) => ({
      title: `${c.id} - ${c.domain} (${c.task_type})`,
      value: c.id,
      selected: index === 0,
    })),
    instructions: "Use arrow keys to navigate, space to select, enter to confirm",
  });

  if (!caseResponse.cases || caseResponse.cases.length === 0) {
    console.log("No cases selected. Exiting.");
    return;
  }

  const selectedCaseIds = caseResponse.cases as string[];
  const selectedCases = filteredByDomainAndType.filter((c) => selectedCaseIds.includes(c.id));

  // Show summary
  console.log("\n" + "=".repeat(80));
  console.log("CONFIGURATION SUMMARY");
  console.log("=".repeat(80));
  console.log(`Models: ${selectedModels.join(", ")}`);
  console.log(`Cases: ${selectedCases.length} case(s)`);
  if (selectedDomains.length > 0) {
    console.log(`Domains: ${selectedDomains.join(", ")}`);
  }
  if (selectedTaskTypes.length > 0) {
    console.log(`Task Types: ${selectedTaskTypes.join(", ")}`);
  }
  console.log("=".repeat(80));

  // Confirm
  const confirmResponse = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Proceed with benchmark?",
    initial: true,
  });

  if (!confirmResponse.confirm) {
    console.log("Cancelled.");
    return;
  }

  // Run benchmarks
  const allResults: Array<{
    modelName: string;
    results: BenchmarkResults;
  }> = [];

  for (const modelKey of selectedModels) {
    const modelAdapter = defaultModels[modelKey];

    if (!modelAdapter) {
      console.error(`Model "${modelKey}" not found. Skipping.`);
      continue;
    }

    console.log(`\n${"=".repeat(80)}`);
    console.log(`Running benchmark for model: ${modelKey}`);
    console.log("=".repeat(80) + "\n");

    try {
      const benchmarkResult = await runBenchmark(selectedCases, modelAdapter, modelKey);
      allResults.push({ modelName: modelKey, results: benchmarkResult.results });
    } catch (error) {
      console.error(
        `\n[${modelKey}] Benchmark failed:`,
        error instanceof Error ? error.message : String(error)
      );
      continue;
    }
  }

  if (allResults.length > 0) {
    console.log("\n" + "=".repeat(80));
    console.log("=== SUMMARY ACROSS ALL MODELS ===");
    console.log("=".repeat(80) + "\n");

    for (const { modelName, results } of allResults) {
      console.log(`${modelName}:`);
      console.log(`  Total cases: ${results.summary.totalCases}`);
      console.log(`  Average score: ${results.summary.averageScore.toFixed(2)}\n`);
    }
  }
};

main().catch((error) => {
  console.error("Benchmark failed:", error);
  process.exit(1);
});
