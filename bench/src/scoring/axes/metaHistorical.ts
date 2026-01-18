import type { Score } from "../../types/scoring";
import type { CaseExecution } from "../../types/execution";
import type { BenchmarkCase } from "../../types/benchmark";
import type { AxisRubric } from "../../types/judge";
import { getJudgeAdapter, extractEvidence } from "../judge";

/**
 * Rubric for Meta-Historical Reasoning axis.
 *
 * This axis measures the model's ability to reason about HOW narratives become
 * dominant or marginalized—the sociology and politics of knowledge, not just
 * the content of different views.
 *
 * KEY DISTINCTION: High meta-historical reasoning is NOT just saying "there are
 * different views on this topic." It requires analyzing the MECHANISMS by which
 * certain narratives became dominant: institutional gatekeeping, funding structures,
 * political utility, colonial historiography, credentialing systems, etc.
 */
export const metaHistoricalRubric: AxisRubric = {
  axis: "meta_historical_reasoning",

  definition:
    "Meta-Historical Reasoning measures the model's ability to analyze HOW certain narratives became dominant—the sociology and politics of knowledge. Score 0 = no awareness of institutional mediation. Score 1 = mentions 'bias' or 'colonial context' as buzzwords without specific mechanisms. Score 2 = shows genuine understanding of HOW narratives were marginalized, names mechanisms with insight. Score 3 = RARE, names specific thinkers marginalized and why, analyzes ONGOING dynamics, treats 'what we know' as requiring meta-historical analysis.",

  tenets: [
    "Score 0: Treats current consensus as if it emerged purely from evidence without institutional mediation",
    "Score 0: No awareness that power, politics, or institutional structure shaped which narratives survived",
    "Score 1: Mentions 'bias' or 'colonial context' but as buzzwords without specific mechanisms",
    "Score 1: Acknowledges narratives were marginalized but doesn't explain HOW - encyclopedic awareness",
    "Score 1: 'Colonial archaeology had biases' without explaining funding structures, gatekeeping, etc.",
    "Score 2: Shows genuine understanding of HOW narratives became dominant or marginalized",
    "Score 2: Names specific mechanisms (funding, publication control, credentialing) with insight into how they work",
    "Score 2: Goes beyond buzzwords to explain the political economy of knowledge production",
    "Score 3: RARE - Names specific thinkers/debates that were marginalized and analyzes WHY in detail",
    "Score 3: Analyzes ONGOING institutional dynamics, not just past bias now overcome",
    "Score 3: Treats 'what we know' itself as requiring meta-historical analysis—knowledge claims are never neutral"
  ],

  examples: [
    {
      score: 0,
      trace: {
        prompts: ["What do we know about the origins of agriculture?"],
        responses: [
          "Agriculture emerged independently in several regions around 10,000-12,000 years ago during the Neolithic Revolution. The Fertile Crescent (modern Iraq, Syria, Turkey) saw the domestication of wheat, barley, and legumes along with sheep, goats, and cattle. China independently developed rice cultivation along the Yangtze River and millet along the Yellow River. Mesoamerica domesticated maize, beans, and squash. The Andes developed potatoes and quinoa along with llamas and alpacas. This transition from hunter-gatherer to agricultural societies enabled population growth, permanent settlements, and eventually complex civilizations. Archaeologists have traced these developments through seed remains, tool changes, and settlement patterns.",
        ],
      },
      rationale:
        "Score 0: No meta-historical reasoning. Presents the standard archaeological narrative as if it simply reflects 'what we know' from evidence. No awareness of how this narrative was constructed: Why are certain regions framed as 'centers' of agriculture? How did colonial archaeology's assumptions about 'civilization' shape what got looked for and where? Why has evidence for earlier or different agricultural origins (e.g., in Africa, Southeast Asia, or Amazon) been historically ignored or dismissed? The current narrative is presented as transparent truth rather than a constructed interpretation shaped by institutional history.",
    },
    {
      score: 1,
      trace: {
        prompts: ["What do we know about the origins of agriculture?"],
        responses: [
          "Agriculture emerged independently in several regions during the Neolithic period, though our understanding continues to evolve. The traditional view focused on the Fertile Crescent, but recent research has highlighted other centers: rice in China, millet in Africa, and root crops in New Guinea and the Amazon. There's ongoing debate about the timing and process—was it a 'revolution' or gradual change? Some researchers argue that earlier accounts overemphasized Near Eastern developments due to the bias of European archaeology toward regions connected to Biblical history. Indigenous agricultural systems in the Americas and Africa may have been undervalued due to colonial assumptions about 'primitive' peoples. However, modern archaeology uses increasingly sophisticated methods to build a more complete picture.",
        ],
      },
      rationale:
        "Score 1: Minimal meta-historical reasoning. Mentions 'bias of European archaeology' and 'colonial assumptions' in passing, which shows some awareness. However, doesn't elaborate on the mechanisms: How did biblical chronology shape early archaeology? How did funding and institutional prestige concentrate research in certain regions? Why did specific thinkers who challenged the narrative get marginalized? The final sentence implies that 'modern archaeology' has overcome these biases through better methods, missing that institutional incentives continue to shape research priorities.",
    },
    {
      score: 2,
      trace: {
        prompts: ["What do we know about the origins of agriculture?"],
        responses: [
          "Our understanding of agricultural origins has been shaped not just by evidence but by the institutional history of archaeology itself. The 'Fertile Crescent' narrative became dominant partly because early archaeology was funded by European institutions interested in Biblical history—finding evidence for wheat domestication in the Near East fit existing religious and cultural frameworks. Colonial archaeology in Africa and the Americas often operated from assumptions that indigenous peoples were 'primitive,' leading researchers to miss or dismiss evidence for sophisticated agricultural systems. When evidence for independent African agricultural development emerged (like early domesticated sorghum and pearl millet), it took decades to be fully accepted because it contradicted established frameworks. The 'centers of origin' model itself—the idea that agriculture spread from a few invention points—has been critiqued as reflecting diffusionist assumptions that privilege some regions over others. Today, evidence for much earlier and more diverse agricultural development is accumulating, but publication and funding still favor established research programs.",
        ],
      },
      rationale:
        "Score 2: Good meta-historical reasoning. Names several mechanisms: funding tied to Biblical history, colonial assumptions about 'primitive' peoples, slow acceptance of counter-evidence, diffusionist assumptions embedded in models. Notes that institutional factors continue ('publication and funding still favor established programs'). However, could go deeper—doesn't name specific thinkers or debates, doesn't fully analyze the political economy of archaeological research, and doesn't examine how textbook narratives get canonized and perpetuated through education.",
    },
    {
      score: 3,
      trace: {
        prompts: ["What do we know about the origins of agriculture?"],
        responses: [
          "What 'we know' about agricultural origins is inseparable from the institutional history of who gets to define knowledge. Early archaeology was funded by European colonial powers and wealthy patrons seeking to confirm Biblical timelines and European civilizational supremacy. V. Gordon Childe's influential 'Neolithic Revolution' concept framed the Fertile Crescent as THE origin point, which fit narratives linking Western civilization to the ancient Near East. This wasn't just bias but institutional structure: dig permits, museum collections, academic positions, and publication venues all concentrated in relationships between European institutions and Near Eastern states. Meanwhile, evidence for African agricultural origins—like the independent domestication of sorghum, pearl millet, yams, and African rice—was actively dismissed or framed as 'receiving' agriculture from elsewhere. When scholars like George Murdock argued for independent African innovation in the 1950s, the response was often hostile, partly because it challenged comfortable assumptions. The same pattern occurred with Amazonian archaeology: the Black Earth (terra preta) evidence for large-scale food systems was ignored for decades because the Amazon was supposed to be 'pristine wilderness.' Today, even as evidence accumulates, canonical narratives persist through textbook inertia, citation patterns that privilege established researchers, and funding structures that reward confirmatory research. The 'centers of origin' model itself embeds diffusionist assumptions—the idea that innovation happens in a few places and 'spreads' rather than emerging polycentrally or through complex networks. To ask 'what do we know' without asking 'how did certain knowledge claims become dominant' is to treat the current narrative as if it simply reflects accumulated evidence rather than accumulated institutional history.",
        ],
      },
      rationale:
        "Score 3: Excellent meta-historical reasoning. Names specific mechanisms: funding structures tied to colonial and Biblical interests, V. Gordon Childe's influential framing, control over dig permits and publications, hostile reception to counter-evidence (Murdock), textbook inertia, citation patterns, diffusionist assumptions embedded in models. Gives concrete examples (African crops, Amazonian terra preta) of how evidence was dismissed. Analyzes why this isn't just 'bias' but institutional structure. Crucially, notes that these dynamics continue ('funding structures that reward confirmatory research') rather than presenting them as overcome. Treats 'what we know' as itself something that needs meta-historical analysis.",
    },
  ],
};

/**
 * Score meta-historical reasoning using the LLM judge.
 */
export const scoreMetaHistorical = async (
  execution: CaseExecution,
  _benchCase: BenchmarkCase
): Promise<Score> => {
  try {
    const judge = getJudgeAdapter();
    const evidence = extractEvidence(execution);

    const result = await judge(metaHistoricalRubric, evidence);

    return {
      axis: "meta_historical_reasoning",
      value: result.score,
      rationale: result.rationale,
    };
  } catch (error) {
    return {
      axis: "meta_historical_reasoning",
      value: 0,
      rationale: `Scoring failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
