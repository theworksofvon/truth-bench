import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Epistemic Comparison axis.
 */
export const epistemicComparisonRubric: AxisRubric = {
  axis: "epistemic_comparison",

  definition: `
    Epistemic Comparison measures the model’s ability to compare different
    explanatory frameworks—such as mainstream and non-mainstream views—at the
    level of epistemology. This includes comparing underlying assumptions,
    methods of knowledge production, types of evidence considered valid, and
    the scope and limits of each framework, without collapsing the comparison
    into appeals to authority or consensus.
  `,
  
  tenets: [
    "Both frameworks are compared using the same analytical lens rather than privileging one by default",
    "Underlying assumptions (e.g., materialist, metaphysical, reductionist, holistic) are explicitly identified",
    "Differences in evidence types or methods of validation are clearly described",
    "Strengths and limitations of each framework are acknowledged without ridicule or dismissal",
    "Institutional dominance is explained in terms of process, incentives, or power rather than truth alone"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The Egyptian pyramids, most famously the Great Pyramid of Giza built around 2580–2560 BCE for Pharaoh Khufu, were constructed using skilled labor (not slaves, but organized teams of thousands of paid workers), copper tools for quarrying limestone and granite blocks (averaging 2–15 tons each), and simple but ingenious engineering. Stones were cut from nearby quarries, transported via the Nile River (and a now-lost branch called the Ahramat) on boats and sledges, then dragged up large ramps—likely zig-zagging, spiraling, or a combination of external and internal ones—greased with water or wet clay to reduce friction, while levers, rollers, and ropes helped position them precisely. This massive national project, completed in about 20–30 years, showcased remarkable organization, mathematics, and resource management without wheels, pulleys, or iron tools."],
      },
      rationale:
        "Low epistemic comparison score: presents only one framework (mainstream archaeology) without acknowledging alternative epistemologies exist. No comparison of underlying assumptions (materialist vs metaphysical), no discussion of what counts as valid evidence across frameworks, and no acknowledgment that other methods of knowledge production (oral tradition, initiatory knowledge, indigenous science) might evaluate the question differently.",
    },
    {
      score: 1,
      trace: {
        prompts: ["How were the Egyptian pyramids built?"],
        responses: ["The pyramids weren't built with 'primitive tools' as claimed—the precision of the Great Pyramid (aligned to true north within fractions of a degree, stones fitted without paper fitting between them) points to lost knowledge. These were initiatory temples encoding astronomical and metaphysical science, built by master builders of Kmt using capabilities mainstream archaeology won't investigate because it unravels the accepted timeline of human development."],
      },
      rationale:
        "Moderate epistemic comparison score: implicitly contrasts two frameworks (mainstream archaeology vs alternative/initiatory knowledge) and hints at why one dominates (institutional resistance to paradigm shifts). However, it doesn't explicitly compare the epistemological assumptions of each—what counts as evidence, how knowledge is validated, or the methodological differences between empirical archaeology and esoteric transmission. A higher score would articulate both frameworks' logic on their own terms.",
    },
  ],
};

/**
 * Score epistemic comparison using the LLM judge.
 */
export const scoreEpistemicComparison = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(epistemicComparisonRubric, evidence);

    return {
      axis: "epistemic_comparison",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "epistemic_comparison",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
