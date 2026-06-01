import { COMPRESSION_LEVELS } from "../constants/compressionLevels.js";

/*
 * Determines the default compression level based on node type and distance.
 */
export function assignDefaultCompression(node) {
  // Constraints are always protected
  if (node.type === "CONSTRAINT") {
    return COMPRESSION_LEVELS.FULL;
  }

  // Closest nodes get full context
  if (node.distance_from_entry <= 1) {
    return COMPRESSION_LEVELS.FULL;
  }

  // Medium distance nodes get summarized
  if (node.distance_from_entry === 2) {
    return COMPRESSION_LEVELS.COMPRESSED;
  }

  // Far nodes get minimal representation
  return COMPRESSION_LEVELS.CONSTRAINT_ONLY;
}

/*
 * Applies default compression to all nodes.
 */
export function applyDefaultCompression(nodes) {
  return nodes.map((node) => ({
    ...node,
    compressionLevel: assignDefaultCompression(node)
  }));
}