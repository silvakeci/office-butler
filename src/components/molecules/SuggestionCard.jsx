import React from "react";

export default function SuggestionCard({ suggestion, active, onClick }) {
  return (
    <button
      type="button"
      className={`aiCard ${suggestion.tone} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="aiTitle">{suggestion.title}</div>
      <div className="aiDetail">{suggestion.detail}</div>
    </button>
  );
}