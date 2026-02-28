import React from "react";

export default function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="segmented">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`segBtn ${Number(value) === Number(opt) ? "active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}