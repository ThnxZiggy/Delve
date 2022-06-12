const express = require('express');
const router = express.Router();
const db = require('../configs/db.config');

//in-memory object
const todos = {
  abc: {
    id: 'abc',
    task: 'study',
    completed: false
  },
  def: {
    id: 'def',
    task: 'exercise',
    completed: true
  }
};

// Create POST /todos
router.post('/', (req, res) => {
  const task = req.body.task;

  const id = Math.random().toString(36).substring(2, 5);

  const newTodo = {
    id, 
    task,
    completed: false
  };

  todos[id] = newTodo

  console.log(todos);

  res.status(201).json(newTodo);
});

// Read GET /todos
router.get('/', (req, res) => {
  const todosArray = Object.values(todos);
  res.json(todosArray);
});

// Update PATCH /todos/:id
router.patch('/:id', (req, res) => {
  const { newTask, completed } = req.body;

  const todoId = req.params.id 
})

// Delete DELETE /todos/:id

module.exports = router;
