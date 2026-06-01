import { assembleBlocks } from "./blockAssembler.js";
import { applyDefaultCompression } from "./compressor.js";
import { fitToBudget } from "./budgetFitter.js";
import { buildContextString } from "./contextBuilder.js";
import { buildSystemPrompt } from "../constants/systemPrompt.js";

import { countThreeSources } from "../utils/tiktokenCounter.js";
/*
 * Runs the complete composition pipeline.
 */
export function compose({
    nodes,
    user,
    patient,
    budget = process.env.TOKEN_BUDGET,
    systemPromptTokens = 800,
    userReserveTokens = 200
}) {
    const fullTokenTotal = nodes.reduce(
        (sum, node) => sum + node.tokens_full,
        0
    );

    console.log(
        "All FULL token total:",
        fullTokenTotal
    );
    // Assign nodes to blocks
    let processedNodes = assembleBlocks(nodes);

    // Apply default compression levels
    processedNodes = applyDefaultCompression(processedNodes);


    // Fit within token budget
    const budgetResult = fitToBudget(
        processedNodes,
        budget,
        systemPromptTokens,
        userReserveTokens
    );

    // Build final context string
    const { contextString, blocks } = buildContextString(
        budgetResult.nodes,
        user,
        patient
    );
    const systemPrompt = buildSystemPrompt({
        orgName:
            "Supra Multi-Specialty Hospital",

        userName:
            user.name,

        userRole:
            user.role,

        contextString
    });

    const actualTokenSummary =
        countThreeSources({
            systemPrompt,
            contextString,
            budget,
            userReserveTokens
        });

    const requiresHumanOverride =
        actualTokenSummary.totalTokens >
        budget;

    return {
        blocks,

        systemPrompt,

        contextString,

        compressionLog:
            budgetResult.compressionLog,

        tokenSummary:
            budgetResult.tokenSummary,

        actualTokenSummary,

        requiresHumanOverride
    };
}