const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, UserId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Get All Tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { UserId: req.user.id, deletedAt: null },
      order: [['createdAt', 'DESC']]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Update Task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, UserId: req.user.id, deletedAt: null } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ title, description, completed });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete Task (Soft Delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, UserId: req.user.id, deletedAt: null } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ deletedAt: new Date() });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;