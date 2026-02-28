import React from "react";

export default function TaskItem({ task, onToggle }) {
  const done = task.status === "done";

  return (
    <div className={`taskRow ${done ? "done" : ""}`}>
      <input
        className="taskCheck"
        type="checkbox"
        checked={done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${done ? "open" : "done"}`}
      />

      <div className="taskMain">
        <div className="taskTitle">{task.title}</div>
        <div className="taskMeta">
          Status: <span className="mono">{task.status}</span>
        </div>
      </div>
    </div>
  );
}