import React from "react";

const CompositionRationale = ({
  tokenSummary,
  compressionLog,
  requiresHumanOverride
}) => {
  if (!tokenSummary) {
    return null;
  }

  const compressionCount =
    compressionLog?.length || 0;

  const utilization = Math.round(
    (tokenSummary.totalTokens /
      tokenSummary.budget) *
      100
  );

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Composition Rationale
      </h2>

      <div className="space-y-3 text-sm">
        <p>
          Final context uses{" "}
          <strong>
            {tokenSummary.totalTokens}
          </strong>{" "}
          out of{" "}
          <strong>
            {tokenSummary.budget}
          </strong>{" "}
          available tokens.
        </p>

        <p>
          Budget utilization:{" "}
          <strong>
            {utilization}%
          </strong>
        </p>

        <p>
          Compression passes executed:{" "}
          <strong>
            {compressionCount}
          </strong>
        </p>

        <p>
          Strategy: lowest injection-weight
          non-constraint nodes were
          compressed first.
        </p>

        <p>
          Human Override Required:{" "}
          <strong
            className={
              requiresHumanOverride
                ? "text-red-600"
                : "text-green-600"
            }
          >
            {requiresHumanOverride
              ? "YES"
              : "NO"}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default CompositionRationale; 