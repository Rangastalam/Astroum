import React from "react";

const CompressionLog = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">
          Compression Log
        </h2>

        <p className="text-gray-500 text-sm">
          No compression required.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Compression Log
      </h2>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 pl-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">
                Pass {index + 1}
              </span>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Saved {log.tokensSaved} tokens
              </span>
            </div>

            <p className="font-medium">
              {log.nodeId}
            </p>

            <p className="text-sm text-gray-600">
              {log.title}
            </p>

            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                {log.before}
              </span>

              <span className="text-xs">
                →
              </span>

              <span className="text-xs bg-green-100 px-2 py-1 rounded">
                {log.after}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {log.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompressionLog;