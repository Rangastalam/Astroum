import React from "react";

const BudgetBar = ({ tokenSummary }) => {
  if (!tokenSummary) {
    return null;
  }

  const usedPercentage =
    (tokenSummary.totalTokens /
      tokenSummary.budget) *
    100;

  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h2 className="text-lg font-semibold">
        Token Budget
      </h2>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{
            width: `${Math.min(
              usedPercentage,
              100
            )}%`
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">
            Budget
          </p>
          <p className="font-medium">
            {tokenSummary.budget}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Used
          </p>
          <p className="font-medium">
            {tokenSummary.totalTokens}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Remaining
          </p>
          <p className="font-medium">
            {tokenSummary.remainingTokens}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">

        <div>
          <p className="text-gray-500">
            System Prompt
          </p>

          <p className="font-medium">
            {tokenSummary.systemPromptTokens}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Context
          </p>

          <p className="font-medium">
            {tokenSummary.contextTokens}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            User Reserve
          </p>

          <p className="font-medium">
            {tokenSummary.userReserveTokens}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Remaining
          </p>

          <p className="font-medium">
            {tokenSummary.remainingTokens}
          </p>
        </div>

      </div>
    </div>
  );
};

export default BudgetBar;