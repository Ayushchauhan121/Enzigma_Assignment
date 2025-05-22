import React from 'react';
import api from '../api';

const DeleteConfirm = ({ task, onClose }) => {
  const handleDelete = async () => {
    await api.delete(`/${task._id}`);
    onClose();
  };

  return (
    <div className="modal">
      <h3 style={{ color: 'red' }}>Delete</h3>
      <p>Do you want to delete task <strong>{task.assignedTo}</strong>?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteConfirm;
