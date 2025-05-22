import React, { useState } from 'react';
import api from '../api';

const EditTaskForm = ({ task, onClose }) => {
  const [formData, setFormData] = useState(task);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(`/${task._id}`, formData);
    onClose();
  };

  return (
    <div className="modal">
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input type="date" name="dueDate" value={formData.dueDate?.slice(0, 10)} onChange={handleChange} />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTaskForm;
