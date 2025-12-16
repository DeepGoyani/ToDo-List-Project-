const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'tasks.json');
const VALID_STATUSES = ['not started', 'in progress', 'completed'];

async function readTasks() {
  try {
    const text = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(text);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

// GET /tasks
async function getAll(req, res) {
  try {
    const { q } = req.query;
    let tasks = await readTasks();
    if (q) {
      const needle = String(q).toLowerCase();
      tasks = tasks.filter(t => (t.title || '').toLowerCase().includes(needle));
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
}

// POST /tasks
async function create(req, res) {
  try {
    const { title, description, status } = req.body || {};
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const tasks = await readTasks();
    const id = Date.now().toString();
    const newTask = {
      id,
      title: title.trim(),
      description: description ? String(description).trim() : '',
      status: VALID_STATUSES.includes(status) ? status : VALID_STATUSES[0],
    };

    tasks.unshift(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
}

// PUT /tasks/:id
async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body || {};
    const tasks = await readTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });

    const updated = { ...tasks[idx] };
    if (title !== undefined) updated.title = String(title).trim();
    if (description !== undefined) updated.description = description ? String(description).trim() : '';
    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
      updated.status = status;
    }

    tasks[idx] = updated;
    await writeTasks(tasks);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

// DELETE /tasks/:id
async function remove(req, res) {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Task not found' });
    const deleted = tasks.splice(idx, 1)[0];
    await writeTasks(tasks);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
