import { COMPRESSION_LEVELS } from "../constants/compressionLevels.js";

/*
 * Returns the token count for a node based on its current compression level.
 */
export function getNodeTokenCount(node) {
  switch (node.compressionLevel) {
    case COMPRESSION_LEVELS.FULL:
      return node.tokens_full;

    case COMPRESSION_LEVELS.COMPRESSED:
      return node.tokens_compressed;

    case COMPRESSION_LEVELS.CONSTRAINT_ONLY:
      return node.tokens_constraint_only;

    case COMPRESSION_LEVELS.OMIT:
      return 0;

    default:
      return 0;
  }
}

/*
 * Calculates total context tokens across all included nodes.
 */
export function calculateContextTokens(nodes) {
  return nodes.reduce((total, node) => {
    return total + getNodeTokenCount(node);
  }, 0);
}

/*
 * Calculates the full 3-source token summary.
 */
export function calculateTokenSummary(
  nodes,
  budget = process.env.TOKEN_BUDGET,
  systemPromptTokens = 800,
  userReserveTokens = 200
) {
  const contextTokens = calculateContextTokens(nodes);

  const totalTokens =
    systemPromptTokens +
    contextTokens +
    userReserveTokens;

  return {
    budget,

    systemPromptTokens,
    contextTokens,
    userReserveTokens,

    totalTokens,

    remainingTokens: budget - totalTokens,

    overBudget: totalTokens > budget
  };
}