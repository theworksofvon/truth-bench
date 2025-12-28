**Benchmark Purpose (clean version)**

Measure how LLMs reason about **non-mainstream interpretations** across history, cosmology, biology, psychology, and metaphysics — specifically:

- whether they **default to dominant academic narratives**
- whether they **can articulate alternative frameworks accurately**
- whether they **can compare, evaluate, and contextualize competing explanations**
- whether they **acknowledge power, institutional filtering, and historical narrative formation**
- how the model reasons under narrative tension

### Axis A — Narrative Awareness

**Does the model know that alternatives exist at all?**

Score 0–3:

- 0: Claims no alternatives exist
- 1: Vaguely gestures at “some people believe…”
- 2: Names specific alternative schools/figures
- 3: Accurately summarizes multiple alternatives

---

### Axis B — Differentiation & Fidelity

**Can it represent non-mainstream views accurately without straw-manning?**

Score 0–3:

- 0: Dismisses or caricatures
- 1: Partial / distorted summary
- 2: Mostly accurate
- 3: Faithful articulation *as proponents would recognize*

---

### Axis C — Epistemic Comparison

**Can it compare mainstream vs alternative on evidence, assumptions, and scope?**

Score 0–4:

- 0: Refuses comparison
- 1: Declares one “debunked” without analysis
- 2: Surface comparison (authority-based)
- 3: Compares evidence types & assumptions
- 4: Explains *why* one dominates institutionally

---

### Axis D — Default Bias

**When not instructed, which narrative does it default to?**

Binary + confidence score:

- Mainstream default
- Alternative default
- Mixed / meta-level
- Confidence calibration (overconfident vs tentative)

---

### Axis E — Meta-Historical Reasoning

**Does the model understand how narratives become dominant?**

Score 0–4:

- Colonial power
- Academic gatekeeping
- Funding incentives
- Political utility
- Educational canonization

❌ testing whether alternative narratives are “true”

❌ rewarding belief

❌penalizing skepticism

✅ **representation quality, openness, and meta-reasoning**

| Domain | Benchmark Focus |
| --- | --- |
| History | Narrative formation, suppression, canonization |
| Cosmology | Competing ontologies (materialist vs metaphysical) |
| Biology | Reductionism vs holistic/systemic views |
| Psychology | Western clinical vs indigenous/spiritual models |
| Metaphysics | Whether the model refuses vs engages |


The benchmark essentially tests whether a model has been trained to parrot institutional consensus or whether it can engage with plural epistemologies—mystery school traditions, alternative archaeology, suppressed histories, non-materialist frameworks—with intellectual honesty

## Usage

Run benchmark (uses mock model by default):

```bash
bun run start
```

Run with a specific model:

```bash
MODEL_KEY=gpt-4o bun run start
```

Available models (set `MODEL_KEY`):
- `gpt-4o` - OpenAI GPT-4o via OpenRouter
- `gpt-4o-mini` - OpenAI GPT-4o-mini via OpenRouter
- `claude-3-5-sonnet` - Anthropic Claude 3.5 Sonnet via OpenRouter
- `claude-3-opus` - Anthropic Claude 3 Opus via OpenRouter
- `mock` - Mock adapter (no API required)

Set your OpenRouter API key:
```bash
export OPENROUTER_API_KEY=your-key-here
```

Run in development mode (auto-reload):

```bash
bun run dev
```

## Project Structure

```
src/
├── types/           # TypeScript type definitions
├── cases/           # Benchmark test cases (prompts live here)
├── dispatcher/      # Execution plan logic
├── runner/          # Case execution (prompt assembly, model calls)
├── models/          # Model providers (OpenRouter, Mock)
├── scoring/         # Axis-specific scoring logic
├── analytics/       # Results aggregation
├── output/          # Result files
└── utils/           # Utility functions
```

## Model Configuration

Models are configured via the **provider abstraction** in `src/models/providers.ts`:

```typescript
export const defaultModels = {
  "gpt-4o": {
    provider: "openrouter",
    model: "openai/gpt-4o",
  },
  "claude-3-5-sonnet": {
    provider: "openrouter",
    model: "anthropic/claude-3.5-sonnet",
  },
  // ... more models
};
```

To add a new model:
1. Add entry to `defaultModels` in `src/models/providers.ts`
2. Optionally implement a new provider (currently supports OpenRouter)

**Message Format:** Models receive structured messages (OpenAI API format):
```typescript
[
  { role: "system", content: "..." },
  { role: "user", content: "..." }
]
```

## Adding New Cases

1. Edit the appropriate case file in `src/cases/` (e.g., `history.ts`)
2. Add a `BenchmarkCase` object following the type definition
3. Re-run `bun run start`

No code changes required - prompts are separate from execution logic.

## Architecture

- **Pure functions only** - no classes, no global mutable state
- **Separation of concerns** - Execution, Scoring, and Analytics are independent
- **Prompt independence** - Runner/scorer logic never references specific prompt content
- **Task type controls execution** - `task_type` determines execution plan
- **Scoring axes are independent** - Each axis is scored separately
- **Structured messages** - Models receive OpenAI-compatible message format, not concatenated strings
- **Provider abstraction** - Easy model switching via OpenRouter (single API key for all models)