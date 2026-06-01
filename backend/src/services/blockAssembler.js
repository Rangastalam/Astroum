import { BLOCKS } from "../constants/blocks.js";

/*
 * Determines which block a node belongs to .
 */
export function assignBlock(node) {
  
  

  // Zone 2 global constraints
  if (node.type === "CONSTRAINT" && node.zone === 2) {
    return BLOCKS.GLOBAL_CONSTRAINTS;
  }

  // Zone 1 active constraints
  if (node.type === "CONSTRAINT" && node.zone === 1) {
    return BLOCKS.ACTIVE_CONSTRAINTS;
  }

  // Recent decisions
  if (node.type === "DECISION") {
    return BLOCKS.RECENT_DECISIONS;
  }

  // Facts and anti-patterns
  if (
    node.type === "FACT" ||
    node.type === "ANTI_PATTERN"
  ) {
    return BLOCKS.SESSION_CONTEXT;
  }

  return null;
}

/*
 * Adds block information to every node.
 */

export function assembleBlocks(nodes) {
  return nodes.map((node) => ({
    ...node,
    block: assignBlock(node)
  }));
}