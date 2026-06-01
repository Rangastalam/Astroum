import React from "react";

const BudgetSlider = ({
  budget,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <label className="font-medium">
        Budget: {budget}
      </label>

      <input
        type="range"
        min="500"
        max="4000"
        step="100"
        value={budget}
        onChange={(e) =>
          onChange(
            Number(e.target.value)
          )
        }
        className="w-full"
      />
    </div>
  );
};

export default BudgetSlider;