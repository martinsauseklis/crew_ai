const express = require('express');
const router = express.Router();
const Joi = require('joi');

// In-memory storage
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date().toISOString() }
];

let nextId = 3;

// Validation schema
const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'user', 'guest').default('user')
});

// GET all users
router.get('/', (req, res) => {
  try {
    let filteredUsers = [...users];
    
    // Filter by role
    if (req.query.role) {
      filteredUsers = filteredUsers.filter(user => user.role === req.query.role);
    }
    
    // Search by name or email
    if (req.query.search) {
      const searchLower = req.query.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    res.json({ users: filteredUsers, total: filteredUsers.length });
  } catch (error) {
    res.status(500).json({ error: { message: 'Failed to fetch users' } });
  }
});

// GET single user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: { message: 'User not found' } });
  }
  res.json(user);
});

// POST create new user
router.post('/', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  
  // Check if email already exists
  if (users.some(u => u.email === value.email)) {
    return res.status(409).json({ error: { message: 'Email already exists' } });
  }
  
  const newUser = {
    id: nextId++,
    ...value,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: { message: 'User not found' } });
  }
  
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: { message: error.details[0].message } });
  }
  
  // Check if email already exists (excluding current user)
  if (users.some(u => u.email === value.email && u.id !== parseInt(req.params.id))) {
    return res.status(409).json({ error: { message: 'Email already exists' } });
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...value,
    updatedAt: new Date().toISOString()
  };
  
  res.json(users[userIndex]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: { message: 'User not found' } });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

module.exports = router;