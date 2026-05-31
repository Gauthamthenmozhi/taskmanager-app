import React from 'react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const stageConfig = {
    TODO: { pill: 'pill-todo', label: 'Todo' },
    IN_PROGRESS: { pill: 'pill-progress', label: 'In Progress' },
    DONE: { pill: 'pill-done', label: 'Done' },
  };
  const config = stageConfig[task.stage] || stageConfig.TODO;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4>{task.title}</h4>
        <div className="task-actions">
          <button className="btn-icon" onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button className="btn-icon btn-danger-icon" onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
        </div>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <span className={`task-stage-pill ${config.pill}`}>{config.label}</span>
    </div>
  );
}
