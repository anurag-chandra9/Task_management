import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fab,
  Zoom,
  Button,
  Fade
} from '@mui/material';
import {
  Sort as SortIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  PlaylistAdd as PlaylistAddIcon
} from '@mui/icons-material';
import {
  selectFilteredTasks,
  selectTaskStats,
  setFilter,
  setSearchQuery,
  setSortBy
} from '../../features/tasks/tasksSlice';
import TaskList from '../TaskList/TaskList';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

const TaskDashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const taskStats = useSelector(selectTaskStats);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleAddTaskClick = () => {
    setIsAddTaskOpen(true);
  };

  const StatCard = ({ title, count, color, icon: Icon }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.1)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
      }}
    >
      <CardContent sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          right: -20, 
          top: -20, 
          opacity: 0.1,
          transform: 'rotate(15deg)',
        }}>
          <Icon sx={{ fontSize: 100, color }} />
        </Box>
        <Typography color="textSecondary" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" component="div" color={color} sx={{ fontWeight: 'bold' }}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pb: 10 }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Task Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlaylistAddIcon />}
            onClick={handleAddTaskClick}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Add New Task
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Stats Section */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <Fade in timeout={500}>
                  <Box>
                    <StatCard 
                      title="Total Tasks" 
                      count={taskStats.total} 
                      color={theme.palette.primary.main}
                      icon={FilterIcon}
                    />
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Fade in timeout={700}>
                  <Box>
                    <StatCard 
                      title="Completed" 
                      count={taskStats.completed} 
                      color={theme.palette.success.main}
                      icon={FilterIcon}
                    />
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Fade in timeout={900}>
                  <Box>
                    <StatCard 
                      title="Pending" 
                      count={taskStats.pending} 
                      color={theme.palette.info.main}
                      icon={FilterIcon}
                    />
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Fade in timeout={1100}>
                  <Box>
                    <StatCard 
                      title="Overdue" 
                      count={taskStats.overdue} 
                      color={theme.palette.error.main}
                      icon={FilterIcon}
                    />
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <Fade in timeout={1300}>
                  <Box>
                    <StatCard 
                      title="Upcoming" 
                      count={taskStats.upcoming} 
                      color={theme.palette.warning.main}
                      icon={FilterIcon}
                    />
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Search and Filters */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search tasks..."
                    variant="outlined"
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                      sx: {
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Filter</InputLabel>
                    <Select
                      label="Filter"
                      onChange={handleFilterChange}
                      defaultValue="all"
                      startAdornment={<FilterIcon color="action" sx={{ ml: 1, mr: 1 }} />}
                    >
                      <MenuItem value="all">All Tasks</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="overdue">Overdue</MenuItem>
                      <MenuItem value="upcoming">Upcoming</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      label="Sort By"
                      onChange={handleSortChange}
                      defaultValue="dueDate"
                      startAdornment={<SortIcon color="action" sx={{ ml: 1, mr: 1 }} />}
                    >
                      <MenuItem value="dueDate">Due Date</MenuItem>
                      <MenuItem value="createdAt">Created Date</MenuItem>
                      <MenuItem value="title">Title</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TaskList tasks={tasks} />
            </Paper>
          </Grid>
        </Grid>

        <AddTaskForm open={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />

        {/* Floating Action Button */}
        <Zoom in={true} timeout={500}>
          <Fab
            color="primary"
            aria-label="add task"
            onClick={handleAddTaskClick}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              '&:hover': {
                transform: 'scale(1.1) rotate(90deg)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Container>
    </Box>
  );
};

export default TaskDashboard;
