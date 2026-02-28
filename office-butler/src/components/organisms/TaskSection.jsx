import React from "react";
import Pill from "../atoms/Pill";
import TaskItem from "../molecules/TaskItem";

export default function TaskSection({ tasks, openCount, onToggle }) {
  return (
    <div className={`card ${tasks.length ? "" : "muted"}`}>
      <div className="cardHeader">
        <h2>Tasks</h2>
        {tasks.length ? (
          <Pill tone="ok">
            {openCount} open / {tasks.length - openCount} done
          </Pill>
        ) : (
          <Pill>No tasks</Pill>
        )}
      </div>

      {tasks.length ? (
        <div className="taskList">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="emptyState">Create an offer to generate the task checklist.</div>
      )}
    </div>
  );
}