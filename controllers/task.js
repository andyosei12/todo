const Task = require('../models/task');

const createTask = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  try {
    const task = await Task.create({ name, user_id: userId });
    return res.status(201).json({
      task,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  const userId = req.userId;
  const { status } = req.query;
  try {
    let tasks;
    if (!status) {
      tasks = await Task.find({ user_id: userId });
    } else {
      tasks = await Task.find({ user_id: userId, status });
    }
    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.userId;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      { status: 'completed' },
      { returnDocument: 'after' }
    );
    return res.status(200).json({
      message: 'Update successful',
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.userId;
  try {
    const task = await Task.deleteOne({ _id: taskId, user_id: userId });
    return res.status(200).json({
      message: 'delete successful',
      task,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
