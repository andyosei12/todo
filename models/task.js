const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed', 'deleted'],
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;
