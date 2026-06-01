import React from "react";

const NodeCard = ({ node }) => {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">
            {node.id}
          </h3>

          <p className="text-sm text-gray-600">
            {node.title}
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {node.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs bg-green-100 px-2 py-1 rounded">
          {node.compressionLevel}
        </span>

        <span className="text-xs bg-blue-100 px-2 py-1 rounded">
          Zone {node.zone}
        </span>

        <span className="text-xs bg-purple-100 px-2 py-1 rounded">
          Weight: {node.injection_weight}
        </span>

        {node.status === "REVIEW_REQUIRED" && (
          <span className="text-xs bg-red-100 px-2 py-1 rounded">
            REVIEW REQUIRED
          </span>
        )}
      </div>
    </div>
  );
};

export default NodeCard;