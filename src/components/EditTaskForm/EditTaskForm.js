import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from '@mui/material';
import { editTask } from '../../features/tasks/tasksSlice';

const EditTaskForm = ({ open, onClose, task }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      // Format the date to local ISO string for the datetime-local input
      const formattedDate = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '';
      setTaskData({
        title: task.title || '',
        description: task.description || '',
        dueDate: formattedDate
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    const updatedTask = {
      ...task,
      title: taskData.title,
      description: taskData.description,
      dueDate: new Date(taskData.dueDate).toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(editTask(updatedTask));
    onClose();
  };

  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="title"
              label="Task Title"
              value={taskData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="description"
              label="Description"
              value={taskData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="dueDate"
              label="Due Date"
              type="datetime-local"
              value={taskData.dueDate}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskForm;
