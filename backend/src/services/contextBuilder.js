import { BLOCKS, BLOCK_TITLES } from "../constants/blocks.js";
import { COMPRESSION_LEVELS } from "../constants/compressionLevels.js";

/*
 * Returns the correct content version based on the node's compression level.
 */
export function getNodeContent(node) {
  switch (node.compressionLevel) {
    case COMPRESSION_LEVELS.FULL:
      return node.content_full;

    case COMPRESSION_LEVELS.COMPRESSED:
      return node.content_compressed;

    case COMPRESSION_LEVELS.CONSTRAINT_ONLY:
      return node.content_constraint_only;

    case COMPRESSION_LEVELS.OMIT:
      return null;

    default:
      return null;
  }
}

/*
 * Groups nodes by block number.
 */
function groupNodesByBlock(nodes) {
  const blocks = {};

  nodes.forEach((node) => {
    if (!node.block) {
      return;
    }

    if (!blocks[node.block]) {
      blocks[node.block] = [];
    }

    blocks[node.block].push(node);
  });

  return blocks;
};
function getStaleNodes(nodes) {
  return nodes.filter(
    (node) => node.status === "REVIEW_REQUIRED"
  );
}

/*
 * Builds the final context string
 * used for system prompt injection.
 */
export function buildContextString(nodes, user, patient) {
  const blocks = groupNodesByBlock(nodes);

  const sections = [];

  // Block 1: Role Frame
  sections.push(
    [
      "=== ROLE ===",
      `You are assisting ${user.name}, ${user.role} in the ${user.department} department.`,
      patient
        ? `Current patient: ${patient.name}.`
        : "",
        patient
        ? `patient conditions: ${patient.conditions.join(", ")}.`
        : ""
      
    ]
      .filter(Boolean)
      .join("\n")
  );

  // Blocks 2 → 7
  const orderedBlocks = [
  BLOCKS.GLOBAL_CONSTRAINTS,
  BLOCKS.RECENT_DECISIONS,
  BLOCKS.ACTIVE_CONSTRAINTS,
  BLOCKS.SESSION_CONTEXT
  ];

  orderedBlocks.forEach((blockId) => {
    const blockNodes = blocks[blockId] || [];

    const content = blockNodes
      .map(getNodeContent)
      .filter(Boolean) 
      .join("\n\n");

    // Skip empty blocks
    if (!content) {
      return;
    }

    sections.push(
      `=== ${BLOCK_TITLES[blockId]} ===\n${content}`
    );
  });
  const staleNodes = getStaleNodes(nodes);

if (staleNodes.length > 0) {
  const staleContent = staleNodes
    .map(
      (node) =>
        `${node.id} (${node.type}) requires review.`
    )
    .join("\n");

  sections.push(
    `=== STALE_FLAGS ===\n${staleContent}`
  );
}

  // Block 8: Session Boundaries
  sections.push(`
=== SESSION_BOUNDARIES ===

CAPTURE:
If the user shares new decisions,
constraints, protocols, or organizational
knowledge worth storing, record them for review.
`.trim());

  return {
    contextString: sections.join("\n\n"),
    blocks
  };
}