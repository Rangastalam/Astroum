import { users } from "../data/users.js";
import { patients } from "../data/patients.js";

import { compose } from "../services/compositionEngine.js";

function runTest() {
  const result = compose({
    nodes: candidateNodes,
    user: users[0],
    patient: patients[0],
    budget: 4000,
    systemPromptTokens: 800,
    userReserveTokens: 200
  });
  
  
  console.log("\n==============================");
  console.log("      TOKEN SUMMARY");
  console.log("==============================\n");

  console.table(result.tokenSummary);

  console.log("\n==============================");
console.log("   ACTUAL TOKEN SUMMARY");
console.log("==============================\n");

console.table(result.actualTokenSummary);

  console.log("\n==============================");
  console.log("     COMPRESSION LOG");
  console.log("==============================\n");

  if (result.compressionLog.length === 0) {
    console.log("No compression required.");
  } else {
    console.table(result.compressionLog);
  }

  console.log("\n==============================");
  console.log("        BLOCKS");
  console.log("==============================\n");

  Object.entries(result.blocks).forEach(
    ([blockId, nodes]) => {
      console.log(
        `Block ${blockId}: ${nodes.length} node(s)`
      );

      nodes.forEach((node) => {
        console.log(
          `  • ${node.id} | ${node.title} | ${node.compressionLevel}`
        );
      });

      console.log("");
    }
  );
  console.log("\n==============================");
console.log("      SYSTEM PROMPT");
console.log("==============================\n");

console.log(result.systemPrompt);

  console.log("\n==============================");
  console.log("    GENERATED CONTEXT");
  console.log("==============================\n");

  console.log(result.contextString);

  console.log("\n==============================");
  console.log("          DONE");
  console.log("==============================\n");
}

runTest();