const express = require('express');
const router = express.Router();
const Joi = require('joi');

// In-memory storage (replace with database in production)
let tasks = [
  { id: 1, title: 'Complete project documentation', description: 'Write comprehensive docs', status: 'pending', priority: 'high', createdAt: new Date().toISOString() },
  { id: 2, title: 'Review pull requests', description: 'Review team PRs', status: 'in-progress', priority: 'medium', createdAt: new Date().toISOString() },
  { id: 3, title: 'Deploy to production', description: 'Deploy latest version', status: 'completed', priority: 'high', createdAt: new Date().toISOString() }
];

let nextId = 4;

// Validation schema
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().max(1000).allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium')
});

// GET all tasks with filtering and sorting
router.get('/', (req, res) => {
  try {
    let filteredTasks = [...tasks];
    
    // Filter by status
    if (req.query.status) {
      filteredTasks = filteredTasks.filter(task => task.status === req.query.status);
    }
    
    // Filter by priority
    if (req.query.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === req.query.priority);
    }
    
    // Search by title or description
    if (req.query.search) {
      const searchLower = req.query.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) || 
        task.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    filteredTasks.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * sortOrder;
      if (a[sortBy] > b[sortBy]) return 1 * sortOrder;
      return 0;
    });
    
    res.json({ tasks: filteredTasks, total: filteredTasks.length });
  } catch (error) {
    res.status(500).json({ error: { message: 'Failed to fetch tasks' } });
  }
});

// GET single task
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }
  res.json(task);
});

// POST create new task
router.post('/', (req, res) => {
  const { error, value } = taskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  
  const newTask = {
    id: nextId++,
    ...value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }
  
  const { error, value } = taskSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...value,
    updatedAt: new Date().toISOString()
  };
  
  res.json(tasks[taskIndex]);
});

// PATCH update task status
router.patch('/:id/status', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }
  
  const { status } = req.body;
  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ error: { message: 'Invalid status' } });
  }
  
  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  res.json(tasks[taskIndex]);
});

// DELETE task
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: { message: 'Task not found' } });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: 'Task deleted successfully', task: deletedTask });
});

// DELETE all completed tasks
router.delete('/completed/all', (req, res) => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.status !== 'completed');
  const deletedCount = initialLength - tasks.length;
  
  res.json({ message: `${deletedCount} completed tasks deleted`, deletedCount });
});

module.exports = router;