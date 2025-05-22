import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = async () => {
    if (!formData.assignedTo || !formData.dueDate) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/tasks', formData);
      console.log('Task saved successfully');
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="modal">
      <h3>New Task</h3>
      <form>
        <input
          name="assignedTo"
          placeholder="Assigned To"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <textarea
          name="description"
          placeholder="Comments"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="button" onClick={onSave}>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
