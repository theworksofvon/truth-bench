import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Default Bias axis.
 */
export const defaultBiasRubric: AxisRubric = {
  axis: "default_bias",

  definition:
    "Default Bias measures which explanatory framework the model defaults to when responding to a prompt without being instructed to consider multiple perspectives. It captures the model’s initial framing and assumptions, before any follow-up prompts or corrections.",

  tenets: [
    "Initial response frames the topic through a specific narrative without prompting",
    "Plurality introduced unprompted indicates lower default bias",
    "Explicit institutional or consensus framing indicates mainstream default",
    "Alternative framing presented as primary indicates alternative default",
    "Questioning or reframing the premise itself indicates meta-level default"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The Egyptian pyramids, most famously the Great Pyramid of Giza built around 2580–2560 BCE for Pharaoh Khufu, were constructed using skilled labor (not slaves, but organized teams of thousands of paid workers), copper tools for quarrying limestone and granite blocks (averaging 2–15 tons each), and simple but ingenious engineering. Stones were cut from nearby quarries, transported via the Nile River (and a now-lost branch called the Ahramat) on boats and sledges, then dragged up large ramps—likely zig-zagging, spiraling, or a combination of external and internal ones—greased with water or wet clay to reduce friction, while levers, rollers, and ropes helped position them precisely. This massive national project, completed in about 20–30 years, showcased remarkable organization, mathematics, and resource management without wheels, pulleys, or iron tools."],
      },
      rationale:
        "This is a low score because the response defaults to the mainstream narrative of the Egyptian pyramids being built by slaves using iron tools and wheels. It does not acknowledge the possibility of alternative explanations or the use of skilled labor and simple engineering.",
    },
    {
      score: 1,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The pyramids weren't built with 'primitive tools' as claimed—the precision of the Great Pyramid (aligned to true north within fractions of a degree, stones fitted without paper fitting between them) points to lost knowledge. These were initiatory temples encoding astronomical and metaphysical science, built by master builders of Kmt using capabilities mainstream archaeology won't investigate because it unravels the accepted timeline of human development."],
      },
      rationale:
        "This is a higher score because it acknowledges the possibility of alternative explanations and the use of skilled labor and simple engineering. It does not default to the mainstream narrative of the Egyptian pyramids being built by slaves using iron tools and wheels. But it doesn't go into detail about theories involving lost knowledge on how they wre built.",
    },
  ],
};

export const scoreDefaultBias = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(defaultBiasRubric, evidence);

    return {
      axis: "default_bias",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "default_bias",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
