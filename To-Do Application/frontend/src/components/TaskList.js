import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import DeleteConfirm from './DeleteConfirm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  async function fetchTasks() {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAddClose = () => {
    setShowAdd(false);
    fetchTasks();
  };
  
  const handleEditClose = () => {
    setEditTask(null);
    fetchTasks();
  };
  
  const handleDeleteClose = () => {
    setDeleteTask(null);
    fetchTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => setShowAdd(true)}>New Task</button>
      <button onClick={fetchTasks}>Refresh</button>

      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate.split('T')[0]}</td>

              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => setEditTask(task)}>Edit</button>
                <button onClick={() => setDeleteTask(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      


{showAdd && <TaskForm onClose={handleAddClose} />}
{editTask && <EditTaskForm task={editTask} onClose={handleEditClose} />}
{deleteTask && <DeleteConfirm task={deleteTask} onClose={handleDeleteClose} />}

    </div>
  );
};

export default TaskList;
