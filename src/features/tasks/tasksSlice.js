import { createSlice } from '@reduxjs/toolkit';
import { isAfter, isBefore, parseISO, startOfDay } from 'date-fns';

const initialState = {
  tasks: [],
  filter: 'all', // all, completed, pending, overdue, upcoming
  searchQuery: '',
  sortBy: 'dueDate' // dueDate, createdAt, title
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        // If task is marked as completed, store the completion date
        task.completedAt = task.completed ? new Date().toISOString() : null;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskCompletion,
  setFilter,
  setSearchQuery,
  setSortBy
} = tasksSlice.actions;

// Selectors
export const selectAllTasks = state => state.tasks.tasks;
export const selectFilter = state => state.tasks.filter;
export const selectSearchQuery = state => state.tasks.searchQuery;
export const selectSortBy = state => state.tasks.sortBy;

// Helper functions for task filtering
const isTaskOverdue = (task) => {
  if (task.completed) return false;
  const dueDate = parseISO(task.dueDate);
  const today = startOfDay(new Date());
  return isBefore(dueDate, today);
};

const isTaskUpcoming = (task) => {
  if (task.completed) return false;
  const dueDate = parseISO(task.dueDate);
  const today = startOfDay(new Date());
  return isAfter(dueDate, today);
};

const sortTasks = (tasks, sortBy) => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return parseISO(a.dueDate) - parseISO(b.dueDate);
      case 'createdAt':
        return parseISO(a.createdAt) - parseISO(b.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
};

export const selectFilteredTasks = state => {
  const tasks = selectAllTasks(state);
  const filter = selectFilter(state);
  const searchQuery = selectSearchQuery(state);
  const sortByValue = selectSortBy(state);
  
  let filteredTasks = tasks;

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  switch (filter) {
    case 'completed':
      filteredTasks = filteredTasks.filter(task => task.completed);
      break;
    case 'pending':
      filteredTasks = filteredTasks.filter(task => !task.completed && !isTaskOverdue(task));
      break;
    case 'overdue':
      filteredTasks = filteredTasks.filter(task => isTaskOverdue(task));
      break;
    case 'upcoming':
      filteredTasks = filteredTasks.filter(task => isTaskUpcoming(task));
      break;
    default: // 'all'
      break;
  }

  // Sort filtered tasks
  return sortTasks(filteredTasks, sortByValue);
};

// Additional selectors for task statistics
export const selectTaskStats = state => {
  const tasks = selectAllTasks(state);
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed && !isTaskOverdue(task)).length,
    overdue: tasks.filter(task => isTaskOverdue(task)).length,
    upcoming: tasks.filter(task => isTaskUpcoming(task)).length
  };
};

export default tasksSlice.reducer;
