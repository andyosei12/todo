const Task = require('../models/task');
const logger = require('../logger');

const createTask = async (req, res) => {
  logger.info('(Create Task) => create task process started');
  const { name } = req.body;
  const userId = req.userId;
  try {
    logger.info('(Create Task) => create task process successful');
    const task = await Task.create({ name, user_id: userId });
    return res.status(201).json({
      task,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  logger.info('(Get Tasks) => get tasks process started');
  const userId = req.userId;
  const { status } = req.query;
  try {
    let tasks;
    if (!status) {
      tasks = await Task.find({ user_id: userId });
    } else {
      tasks = await Task.find({ user_id: userId, status });
    }
    logger.info('(Get Tasks) => get tasks process successful');
    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.userId;
  logger.info('(Update Task) => update task process started');
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user_id: userId },
      { status: 'completed' },
      { returnDocument: 'after' }
    );
    logger.info('(Update Task) => update task process successful');
    return res.status(200).json({
      message: 'Update successful',
      updatedTask,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error,
    });
  }
};

const deleteTask = async (req, res) => {
  logger.info('(Delete Task) => delete task process started');
  const { taskId } = req.params;
  const userId = req.userId;
  try {
    const task = await Task.deleteOne({ _id: taskId, user_id: userId });
    logger.info('(Delete Task) => delete task process successful');
    return res.status(200).json({
      message: 'delete successful',
      task,
    });
  } catch (error) {
    logger.error(error);
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
