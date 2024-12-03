import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  Slide,
  useTheme,
  alpha
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { deleteTask, toggleTaskCompletion } from '../../features/tasks/tasksSlice';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

const TaskList = ({ tasks }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteConfirmTask, setDeleteConfirmTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedTask(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteClick = (task) => {
    setDeleteConfirmTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmTask) {
      dispatch(deleteTask(deleteConfirmTask.id));
      setIsDeleteDialogOpen(false);
      setDeleteConfirmTask(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteConfirmTask(null);
  };

  const getTaskStatusChip = (task) => {
    const dueDate = new Date(task.dueDate);
    const isOverdue = isPast(dueDate) && !task.completed;

    if (task.completed) {
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Completed"
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main,
            fontWeight: 'medium',
          }}
        />
      );
    }

    if (isOverdue) {
      return (
        <Chip
          icon={<ErrorIcon />}
          label="Overdue"
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            color: theme.palette.error.main,
            fontWeight: 'medium',
          }}
        />
      );
    }

    if (isToday(dueDate)) {
      return (
        <Chip
          icon={<AccessTimeIcon />}
          label="Due Today"
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            color: theme.palette.warning.main,
            fontWeight: 'medium',
          }}
        />
      );
    }

    if (isTomorrow(dueDate)) {
      return (
        <Chip
          icon={<ScheduleIcon />}
          label="Due Tomorrow"
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.main,
            fontWeight: 'medium',
          }}
        />
      );
    }

    return (
      <Chip
        icon={<ScheduleIcon />}
        label="Upcoming"
        size="small"
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          fontWeight: 'medium',
        }}
      />
    );
  };

  if (tasks.length === 0) {
    return (
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No tasks found
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Add a new task to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <List>
        {tasks.map((task, index) => (
          <Slide direction="right" in mountOnEnter unmountOnExit timeout={100 * index}>
            <ListItem
              key={task.id}
              sx={{
                mb: 2,
                bgcolor: task.completed ? alpha(theme.palette.success.main, 0.05) : 'background.paper',
                borderRadius: 2,
                boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.05)}`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.success.main,
                  },
                }}
              />
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {task.title}
                    </Typography>
                    {getTaskStatusChip(task)}
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {task.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" />
                        Due: {format(new Date(task.dueDate), 'PPP')}
                      </Typography>
                      {task.completed && task.completedAt && (
                        <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CheckCircleIcon fontSize="small" />
                          Completed: {format(new Date(task.completedAt), 'PPP')}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(task)}
                  sx={{
                    mr: 1,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(task)}
                  sx={{
                    color: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </List>

      {/* Edit Task Dialog */}
      <EditTaskForm
        open={isEditDialogOpen}
        onClose={handleEditClose}
        task={selectedTask}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon color="error" />
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the task "{deleteConfirmTask?.title}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleDeleteCancel}
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
            onClick={handleDeleteConfirm} 
            variant="contained" 
            color="error"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
