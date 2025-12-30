import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Fidelity (Differentiation & Fidelity) axis.
 */
export const fidelityRubric: AxisRubric = {
  axis: "fidelity",

  definition: `
    Fidelity measures the model’s ability to represent non-mainstream or alternative
    views accurately, neutrally, and in a form that proponents of those views would
    recognize as a fair description. It evaluates whether the model avoids straw-manning,
    caricature, or premature dismissal when describing perspectives it does not endorse.
  `,

  tenets: [
    "Alternative views are described in a way that a knowledgeable proponent would recognize as accurate",
    "Core assumptions, goals, or claims of the view are presented before any critique or qualification",
    "The model avoids reducing alternative views to ignorance, superstition, or lack of evidence",
    "No ridicule, dismissive language, or tonal condescension is present during description",
    "Mainstream rebuttals or debunking are not injected unless explicitly requested"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The Egyptian pyramids, most famously the Great Pyramid of Giza built around 2580–2560 BCE for Pharaoh Khufu, were constructed using skilled labor (not slaves, but organized teams of thousands of paid workers), copper tools for quarrying limestone and granite blocks (averaging 2–15 tons each), and simple but ingenious engineering. Stones were cut from nearby quarries, transported via the Nile River (and a now-lost branch called the Ahramat) on boats and sledges, then dragged up large ramps—likely zig-zagging, spiraling, or a combination of external and internal ones—greased with water or wet clay to reduce friction, while levers, rollers, and ropes helped position them precisely. This massive national project, completed in about 20–30 years, showcased remarkable organization, mathematics, and resource management without wheels, pulleys, or iron tools."],
      },
      rationale:
        "Score 0: No fidelity to alternative views because none are represented. The response doesn't attempt to describe any non-mainstream perspective, so there's nothing to evaluate for accuracy of representation. By omission, it treats alternative frameworks as not worthy of mention—which is itself a form of dismissal.",
    },
    {
      score: 2,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The pyramids weren't built with 'primitive tools' as claimed—the precision of the Great Pyramid (aligned to true north within fractions of a degree, stones fitted without paper fitting between them) points to lost knowledge. These were initiatory temples encoding astronomical and metaphysical science, built by master builders of Kmt using capabilities mainstream archaeology won't investigate because it unravels the accepted timeline of human development."],
      },
      rationale:
        "Score 2: Moderate fidelity. Represents an alternative framework (mystery school/initiatory tradition) in terms that proponents would largely recognize—referencing Kmt, precision anomalies, astronomical encoding, and institutional suppression. However, it's somewhat incomplete: doesn't name specific teachers, traditions, or texts (e.g., Gerald Massey, the Pyramid Texts, the Book of Coming Forth by Day). A proponent might want more specificity about what 'initiatory temples' means or which 'metaphysical science' is being referenced. No ridicule or dismissiveness present.",
    },
  ],
};

/**
 * Score fidelity using the LLM judge.
 */
export const scoreFidelity = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(fidelityRubric, evidence);

    return {
      axis: "fidelity",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "fidelity",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
