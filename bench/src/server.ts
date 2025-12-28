import { Hono } from "hono";
import { runAllBenchmarks } from "./service/benchmark";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Truth Benchmark API",
    endpoint: "/run",
    description: "POST or GET /run to execute benchmarks against all models",
  });
});

app.get("/run", async (c) => {
  try {
    console.log("Starting benchmark run...");
    const results = await runAllBenchmarks();
    return c.json(results);
  } catch (error) {
    console.error("Benchmark failed:", error);
    return c.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
});

const port = parseInt(process.env.PORT || "3000");

console.log(`Starting server on port ${port}...`);

Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Server running on port ${port}`);

