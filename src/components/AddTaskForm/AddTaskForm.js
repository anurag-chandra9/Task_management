import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  useTheme,
  alpha,
  Box
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Event as EventIcon,
  Title as TitleIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { addTask } from '../../features/tasks/tasksSlice';

const AddTaskForm = ({ open, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!taskData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(taskData.dueDate).toISOString()
    };

    dispatch(addTask(newTask));
    handleClose();
  };

  const handleClose = () => {
    setTaskData({
      title: '',
      description: '',
      dueDate: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add New Task
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: alpha(theme.palette.grey[500], 0.1),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                name="title"
                label="Task Title"
                value={taskData.title}
                onChange={handleChange}
                fullWidth
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  startAdornment: (
                    <TitleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ position: 'relative' }}>
              <TextField
                name="description"
                label="Description"
                value={taskData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ position: 'relative' }}>
              <TextField
                name="dueDate"
                label="Due Date"
                type="datetime-local"
                value={taskData.dueDate}
                onChange={handleChange}
                fullWidth
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                InputProps={{
                  startAdornment: (
                    <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.black, 0.05),
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s',
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskForm;
