import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store';
import theme from './theme/theme';
import TaskDashboard from './components/TaskDashboard/TaskDashboard';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          <TaskDashboard />
          <Footer />
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
