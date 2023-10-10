const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
});

const TaskModel = mongoose.model('products', TaskSchema);

module.exports = TaskModel;
