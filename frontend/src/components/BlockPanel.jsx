import React from "react";
import NodeCard from "./NodeCard";

const BLOCK_NAMES = {
    2: "Global Constraints",
    3: "Recent Decisions",
    4: "Active Constraints",
    5: "Session Context"
};

const BlockPanel = ({ blocks }) => {
    if (!blocks) {
        return null;
    }

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(blocks).map(
                ([blockId, nodes]) => (
                    <div
                        key={blockId}
                        className="border rounded-lg p-4 bg-white"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-semibold">
                                {BLOCK_NAMES[blockId]}
                            </h2>

                            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {nodes.length} nodes
                            </span>
                        </div>

                        <div className="space-y-2">
                            {nodes.map((node) => (
                                <NodeCard
                                    key={node.id}
                                    node={node}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default BlockPanel;