import { COMPRESSION_LEVELS } from "../constants/compressionLevels.js";
import { calculateTokenSummary } from "./tokenCounter.js";

/*
 * Moves a node one level lower in the
 * compression hierarchy.
 */
export function downgradeCompressionLevel(node) {
  switch (node.compressionLevel) {
    case COMPRESSION_LEVELS.FULL:
      node.compressionLevel = COMPRESSION_LEVELS.COMPRESSED;
      break;

    case COMPRESSION_LEVELS.COMPRESSED:
      node.compressionLevel = COMPRESSION_LEVELS.CONSTRAINT_ONLY;
      break;

    // case COMPRESSION_LEVELS.CONSTRAINT_ONLY:
    //   node.compressionLevel = COMPRESSION_LEVELS.OMIT;
    //   break;

    default:
      break;
  }

  return node;
}

/*
 * Finds the lowest injection-weight node  that can still be compressed.
 */
export function findCompressionCandidate(nodes) {
  const candidates = nodes.filter(
    (node) =>
      node.type !== "CONSTRAINT" &&
      node.compressionLevel !== COMPRESSION_LEVELS.CONSTRAINT_ONLY
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort(
    (a, b) => a.injection_weight - b.injection_weight
  )[0];
}

/*
 * Iteratively compresses nodes until the token budget is satisfied.
 */
export function fitToBudget(
  nodes,
  budget = process.env.TOKEN_BUDGET,
  systemPromptTokens = 800,
  userReserveTokens = 200
) {
  const compressionLog = [];

  let tokenSummary = calculateTokenSummary(
    nodes,
    budget,
    systemPromptTokens,
    userReserveTokens
  );

  while (tokenSummary.overBudget) {
    const candidate = findCompressionCandidate(nodes);

    if (!candidate) {
      return {
        nodes,
        compressionLog,
        tokenSummary,
        requiresHumanOverride: true
      };
    }

    const beforeLevel = candidate.compressionLevel;

    const beforeTokens =
      tokenSummary.contextTokens;

    downgradeCompressionLevel(candidate);

    tokenSummary = calculateTokenSummary(
      nodes,
      budget,
      systemPromptTokens,
      userReserveTokens
    );

    const afterTokens =
      tokenSummary.contextTokens;

    compressionLog.push({
      nodeId: candidate.id,
      title: candidate.title,

      before: beforeLevel,
      after: candidate.compressionLevel,

      tokensSaved:
        beforeTokens - afterTokens,

      reason:
        "Lowest injection weight non-CONSTRAINT node"
    });
  }

  return {
    nodes,
    compressionLog,
    tokenSummary,
    requiresHumanOverride: false
  };
}