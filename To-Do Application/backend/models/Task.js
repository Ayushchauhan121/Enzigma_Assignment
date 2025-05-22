const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  assignedTo: { type: String, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Normal', 'High'], required: true },
  description: { type: String },
  comments: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
