const Task = require('../models/task');

const addTask = async ({ task, userId }) => {
  try {
    const newTask = await Task.create({ name: task, user_id: userId });
    return {
      code: 201,
      newTask,
    };
  } catch (error) {
    return {
      error: true,
      code: 500,
      message: error.message,
    };
  }
};

const getTasks = async (userId, status) => {
  try {
    let tasks;
    if (!status) {
      tasks = await Task.find({ user_id: userId });
    } else {
      tasks = await Task.find({ user_id: userId, status });
    }
    return {
      code: 200,
      tasks,
    };
  } catch (error) {
    return {
      code: 500,
      error: true,
      message: error.message,
    };
  }
};

// const getTasks = async (userId) => {
//   try {
//     const tasks = await Task.find({ user_id: userId });
//     return {
//       code: 200,
//       tasks,
//     };
//   } catch (error) {
//     return {
//       code: 500,
//       error: true,
//       message: error.message,
//     };
//   }
// };

const updateTask = async (taskId) => {
  try {
    await Task.findOneAndUpdate(
      { _id: taskId },
      { status: 'completed' },
      { returnDocument: 'after' }
    );
    return {
      code: 200,
      message: 'Update successful',
    };
  } catch (error) {
    return {
      code: 500,
      error: true,
      message: error.message,
    };
  }
};

const deleteTask = async (taskId) => {
  try {
    await Task.deleteOne({ _id: taskId });
    return {
      code: 200,
      message: 'Task deleted successfully',
    };
  } catch (error) {
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
