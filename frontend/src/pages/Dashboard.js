import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const STAGES = [
  { key: 'TODO', label: 'Todo', colClass: 'col-todo', icon: '📋' },
  { key: 'IN_PROGRESS', label: 'In Progress', colClass: 'col-progress', icon: '⚡' },
  { key: 'DONE', label: 'Done', colClass: 'col-done', icon: '✅' },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSave = async (form) => {
    try {
      if (modal.task) {
        const res = await api.put(`/tasks/${modal.task.id}`, form);
        setTasks(tasks.map((t) => (t.id === modal.task.id ? res.data : t)));
      } else {
        const res = await api.post('/tasks', form);
        setTasks([...tasks, res.data]);
      }
      setModal(null);
    } catch {
      setError('Failed to save task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const tasksByStage = (stage) => tasks.filter((t) => t.stage === stage);
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="navbar-brand">
          <div className="navbar-brand-icon">✅</div>
          <h1>TaskFlow</h1>
        </div>
        <div className="navbar-right">
          <div className="user-badge">
            <div className="user-avatar">{initials}</div>
            {username}
          </div>
          <button className="btn-ghost" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Track and manage your work across all stages</p>
          </div>
          <button className="btn-new-task" onClick={() => setModal({ task: null })}>
            + New Task
          </button>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-icon stat-icon-total">📊</div>
            <div className="stat-info">
              <p>Total</p>
              <h3>{tasks.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-todo">📋</div>
            <div className="stat-info">
              <p>Todo</p>
              <h3>{tasksByStage('TODO').length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-progress">⚡</div>
            <div className="stat-info">
              <p>In Progress</p>
              <h3>{tasksByStage('IN_PROGRESS').length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-done">✅</div>
            <div className="stat-info">
              <p>Done</p>
              <h3>{tasksByStage('DONE').length}</h3>
            </div>
          </div>
        </div>

        {error && <div className="error" style={{ marginBottom: '1rem' }}>⚠️ {error}</div>}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            Loading your tasks...
          </div>
        ) : (
          <div className="board">
            {STAGES.map((stage) => (
              <div key={stage.key} className={`column ${stage.colClass}`}>
                <div className="column-header">
                  <div className="column-title">
                    <div className="column-dot"></div>
                    <h3>{stage.label}</h3>
                  </div>
                  <span className="badge">{tasksByStage(stage.key).length}</span>
                </div>
                <div className="column-body">
                  {tasksByStage(stage.key).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={(t) => setModal({ task: t })}
                      onDelete={handleDelete}
                    />
                  ))}
                  {tasksByStage(stage.key).length === 0 && (
                    <div className="empty">
                      <div className="empty-icon">{stage.icon}</div>
                      <span>No tasks here</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <TaskModal
          task={modal.task}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
