const Task = require('../models/task');
const logger = require('../logger');

const addTask = async ({ task, userId }) => {
  logger.info('(Create Task) => create task process started');
  try {
    const newTask = await Task.create({ name: task, user_id: userId });
    logger.info('(Create Task) => create task process successful');
    return {
      code: 201,
      newTask,
    };
  } catch (error) {
    logger.error(error);
    return {
      error: true,
      code: 500,
      message: error.message,
    };
  }
};

const getTasks = async (userId, status) => {
  logger.info('(Get Tasks) => get tasks process started');
  try {
    let tasks;
    if (!status) {
      tasks = await Task.find({ user_id: userId });
    } else {
      tasks = await Task.find({ user_id: userId, status });
    }
    logger.info('(Get Tasks) => get tasks process successful');
    return {
      code: 200,
      tasks,
    };
  } catch (error) {
    logger.error(error);
    return {
      code: 500,
      error: true,
      message: error.message,
    };
  }
};

const updateTask = async (taskId) => {
  logger.info('(Update Task) => update task process started');
  try {
    await Task.findOneAndUpdate(
      { _id: taskId },
      { status: 'completed' },
      { returnDocument: 'after' }
    );
    logger.info('(Update Task) => update task process successful');
    return {
      code: 200,
      message: 'Update successful',
    };
  } catch (error) {
    logger.error(error);
    return {
      code: 500,
      error: true,
      message: error.message,
    };
  }
};

const deleteTask = async (taskId) => {
  logger.info('(Delete Task) => delete task process started');
  try {
    await Task.deleteOne({ _id: taskId });
    logger.info('(Delete Task) => delete task process successful');
    return {
      code: 200,
      message: 'Task deleted successfully',
    };
  } catch (error) {
    logger.error(error);
    return {
      code: 500,
      error: true,
      message: error.message,
    };
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};
