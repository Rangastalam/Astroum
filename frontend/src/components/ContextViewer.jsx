import React, { useState } from "react";

const ContextViewer = ({ contextString }) => {
  const [isOpen, setIsOpen] =
    useState(false);

  if (!contextString) {
    return null;
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Final Context
        </h2>

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="px-3 py-1 bg-black text-white rounded text-sm"
        >
          {isOpen
            ? "Hide Context"
            : "View Context"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          <pre className="bg-gray-50 border rounded p-4 overflow-auto max-h-[500px] text-sm whitespace-pre-wrap">
            {contextString}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ContextViewer;