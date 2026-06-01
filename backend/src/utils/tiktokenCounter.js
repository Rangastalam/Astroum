import { get_encoding } from "tiktoken";

const encoder = get_encoding("cl100k_base");

/*
 * Count tokens for a given string.
 */
export function countTokens(text = "") {
  return encoder.encode(text).length;
}

/*
 * Count all three sources before an LLM call:
 * 1. System Prompt
 * 2. Context String
 * 3. User Reserve
 */
export function countThreeSources({
  systemPrompt,
  contextString,
  budget = process.env.TOKEN_BUDGET,
  userReserveTokens = 200
}) {
  const systemPromptTokens =
    countTokens(systemPrompt);

  const contextTokens =
    countTokens(contextString);

  const totalTokens =
    systemPromptTokens +
    userReserveTokens;

  return {
    budget,

    systemPromptTokens,
    contextTokens,
    userReserveTokens,

    totalTokens,

    remainingTokens:
      budget - totalTokens,

    overBudget:
      totalTokens > budget
  };
}