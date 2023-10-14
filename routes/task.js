const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../tasks/tasks.controller');
const validateTaskCreation = require('../middleware/task/validateTaskCreation');

const router = express.Router();

router.get('/', getTasks);

router.post('/', validateTaskCreation, createTask);

router.patch('/:taskId', updateTask);

router.delete('/:taskId', deleteTask);

module.exports = router;
