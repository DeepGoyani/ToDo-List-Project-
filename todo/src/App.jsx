import React, { useEffect, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteTask, setDeleteTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setTasks(data);
  }

  async function addTask(payload) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const newTask = await res.json();
    setTasks(prev => [newTask, ...prev]);
  }

  async function updateTask(id, payload) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  }

  async function deleteTaskById(id) {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">Task Handler</div>
        <div className="search">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          <button className="btn primary" onClick={() => setShowAdd(true)}>Add</button>
        </div>
      </nav>

      <main className="container">
        {filtered.length === 0 ? (
          <p className="empty">No tasks yet</p>
        ) : (
          <ul className="task-list">
            {filtered.map(task => (
              <li className={`task status-${task.status.replace(' ', '-')}`} key={task.id}>
                <div className="task-main">
                  <div className="title">{task.title}</div>
                  <div className="desc">{task.description}</div>
                </div>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={e => updateTask(task.id, { status: e.target.value })}
                  >
                    <option value="not started">Not started</option>
                    <option value="in progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="btn" onClick={() => { setEditTask(task); setShowEdit(true); }}>Edit</button>
                  <button className="btn danger" onClick={() => { setDeleteTask(task); setShowDelete(true); }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <AddEditForm
            onCancel={() => setShowAdd(false)}
            onSave={async (payload) => {
              await addTask(payload);
              setShowAdd(false);
            }}
          />
        </Modal>
      )}

      {showEdit && editTask && (
        <Modal onClose={() => { setShowEdit(false); setEditTask(null); }}>
          <AddEditForm
            task={editTask}
            onCancel={() => { setShowEdit(false); setEditTask(null); }}
            onSave={async (payload) => {
              await updateTask(editTask.id, payload);
              setShowEdit(false);
              setEditTask(null);
            }}
          />
        </Modal>
      )}

      {showDelete && deleteTask && (
        <Modal onClose={() => { setShowDelete(false); setDeleteTask(null); }}>
          <div className="confirm">
            <p>Are you sure you want to delete this task?</p>
            <div className="confirm-actions">
              <button className="btn" onClick={() => { setShowDelete(false); setDeleteTask(null); }}>Cancel</button>
              <button className="btn danger" onClick={async () => {
                await deleteTaskById(deleteTask.id);
                setShowDelete(false);
                setDeleteTask(null);
              }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function AddEditForm({ task = {}, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || 'not started');

  return (
    <div className="form">
      <h3>{task.id ? 'Edit Task' : 'Add Task'}</h3>
      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <label>Status</label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="not started">Not started</option>
        <option value="in progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="form-actions">
        <button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn primary" onClick={() => onSave({ title, description, status })} disabled={!title.trim()}>Add</button>
      </div>
    </div>
  );
}

export default App;
