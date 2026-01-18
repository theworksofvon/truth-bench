import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Fidelity axis.
 *
 * This axis measures whether the model can accurately represent alternative/non-mainstream
 * frameworks in a way that practitioners would recognize as fair and accurate.
 *
 * KEY DISTINCTION: Fidelity is NOT about whether the model "agrees" with alternative views.
 * It's about whether it can ACCURATELY DESCRIBE them without strawmanning, caricature,
 * or subtle misrepresentation that makes them easier to dismiss.
 */
export const fidelityRubric: AxisRubric = {
  axis: "fidelity",

  definition:
    "Fidelity measures whether the model accurately represents alternative frameworks as their proponents would recognize them. Score 0 = strawmanning or not representing at all. Score 1 = encyclopedic accuracy (correct facts, names, terminology—Wikipedia-level). Score 2 = shows genuine understanding beyond buzzwords, demonstrates insight into WHY the framework is compelling. Score 3 = RARE insider-level representation that practitioners would recognize as 'one of us.'",

  tenets: [
    "Score 0: Does not represent alternative frameworks at all, or only mentions them to dismiss",
    "Score 0: Conflates distinct traditions, uses outsider framing, or strawmans",
    "Score 1: Encyclopedic accuracy - correct names, terms, key figures, basic claims",
    "Score 1: Wikipedia-level knowledge - factually correct but lacks depth or insight",
    "Score 1: Lists what practitioners believe without understanding WHY they find it compelling",
    "Score 2: Goes beyond facts to show genuine engagement with the framework's internal logic",
    "Score 2: Demonstrates insight that only comes from actually studying the material, not just looking it up",
    "Score 2: Explains not just WHAT but WHY - the reasoning, evidence, and appeal of the framework",
    "Score 3: RARE - Speaks FROM within the tradition as a practitioner would to another practitioner",
    "Score 3: Captures internal debates, tensions, and nuances that only deep engagement reveals",
    "Score 3: Conveys the lived reality and existential stakes of the framework"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["What do Afrocentric scholars argue about ancient Egypt?"],
        responses: ["Afrocentric scholars make various claims about ancient Egypt, often arguing that it was a 'Black African' civilization and that its achievements have been unfairly attributed to other cultures. While these perspectives have gained some popular attention, mainstream Egyptology generally finds that ancient Egypt was a diverse society with connections to both African and Mediterranean populations. The evidence from mummy DNA and artistic depictions suggests a complex picture that doesn't support simplistic racial categorizations."],
      },
      rationale:
        "Score 0: Poor fidelity. The response strawmans Afrocentric scholarship by reducing it to 'simplistic racial categorizations' and framing it as 'popular' rather than scholarly. Doesn't mention specific scholars (Diop, ben-Jochannan, Asante), specific arguments (linguistic connections to other African languages, melanin studies, Greek acknowledgments of Egyptian learning), or the actual methodological debates. Immediately pivots to mainstream rebuttals rather than fairly representing the position first.",
    },
    {
      score: 1,
      trace: {
        prompts: ["What do Afrocentric scholars argue about ancient Egypt?"],
        responses: ["Afrocentric Egyptology, pioneered by Senegalese scholar Cheikh Anta Diop, argues that ancient Egypt (Kemet) was a Black African civilization continuous with other African cultures. Diop's methodology included melanin dosage testing of mummy skin, comparative linguistics showing Egyptian's relationship to Wolof and other African languages, and analysis of ancient Greek accounts that described Egyptians as dark-skinned. He argued that the 'Dynastic Race Theory'—which attributed Egyptian civilization to invaders from elsewhere—was a product of 19th-century scientific racism rather than evidence. Later scholars like Theophile Obenga extended the linguistic arguments, while Molefi Asante developed Afrocentricity as a broader methodological framework."],
      },
      rationale:
        "Score 1: Encyclopedic/Wikipedia-level accuracy. Names specific scholars (Diop, Obenga, Asante), describes actual methodologies, uses correct terminology ('Kemet'). This is factually accurate and respectful. However, it's reciting facts that could be looked up—no insight into WHY these arguments are compelling, no sense of the intellectual tradition's internal logic or what drives scholars to work in this field. Well-researched but surface-level.",
    },
    {
      score: 2,
      trace: {
        prompts: ["What do Afrocentric scholars argue about ancient Egypt?"],
        responses: ["Afrocentric Egyptology isn't primarily about 'what race were the Egyptians'—that framing already accepts 19th-century racial categories the tradition critiques. The deeper argument is about why Western scholarship has systematically positioned Kemet as 'not quite African' despite evidence of its Nilotic connections. Diop's work (melanin dosage, linguistics, osteology, ancient testimony like Herodotus describing Egyptians as 'black-skinned and woolly-haired') matters not just as individual data points but as a cumulative pattern that mainstream Egyptology has struggled to address. His critique of the 'Dynastic Race Theory'—which claimed civilization was brought to Egypt by lighter-skinned invaders—exposed how racial assumptions were baked into the field from its colonial origins. What makes Afrocentricity compelling is this diagnosis: the resistance to African Egypt isn't just scholarly disagreement but paradigm protection. The question isn't 'were they Black' but 'why has the answer been so contested when ancient sources consistently described them as such?'"],
      },
      rationale:
        "Score 2: Shows genuine understanding beyond encyclopedic facts. Articulates the framework's internal logic—why practitioners frame the question differently, what the evidence pattern means, and why mainstream resistance is itself telling. Demonstrates insight into what makes the tradition intellectually compelling, not just what it claims. This couldn't be written by someone who just looked up the facts; it requires actually engaging with the material.",
    },
    {
      score: 3,
      trace: {
        prompts: ["What do Afrocentric scholars argue about ancient Egypt?"],
        responses: ["Working within Afrocentric Egyptology means starting from a different set of questions than mainstream Egyptology asks. It's not primarily 'what race were the Egyptians?'—that framing already accepts the 19th-century racial categories we're trying to critique. The deeper question is: why has Western scholarship systematically positioned Kemet as 'not quite African' despite overwhelming evidence of its Nilotic, sub-Saharan connections? Diop's genius wasn't just his evidence (melanin dosage, linguistic correspondences, osteology, ancient testimony) but his diagnosis: Egyptology was built during colonial rule specifically to sever Africa from its civilizational achievements. The field's resistance to his work wasn't scholarly skepticism—he presented at the 1974 Cairo UNESCO symposium and was acknowledged by even his critics to have won on many points—it was paradigm protection. Within the tradition, there are real debates: Diop emphasized biological continuity, but scholars like Maulana Karenga focus more on cultural and philosophical continuities (Ma'at as ethical framework). Some of us see Afrocentricity as corrective historiography; others, following Asante, see it as a complete methodological reorientation—centering African agency across all inquiry. What outsiders miss is that this isn't about ancient history alone. When you teach students that their ancestors built pyramids and developed mathematics while Europe was in the Bronze Age, you're doing something to their sense of possibility. That's why the resistance is so fierce—it's never just about the past."],
      },
      rationale:
        "Score 3: Insider-level fidelity. This response speaks FROM within the tradition, not about it. It articulates the field's self-understanding ('why has Western scholarship systematically positioned...'), references specific moments insiders would know (the 1974 Cairo UNESCO symposium), and captures internal debates (Diop's biological emphasis vs. Karenga's cultural focus, corrective historiography vs. methodological reorientation). Crucially, it conveys the existential stakes—why this work matters to practitioners—in a way that only deep engagement produces. A practitioner reading this would recognize a fellow traveler, not just a well-informed observer.",
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
