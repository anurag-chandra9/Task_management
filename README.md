# Task Management Dashboard

A modern, responsive task management application built with React and Material-UI.

![Task Management Dashboard](https://github.com/anurag-chandra9/Task_management/raw/main/screenshot.png)

## Features

- Modern, intuitive interface
- Fully responsive design
- Comprehensive task management
- Advanced filtering and sorting
- Task statistics dashboard
- Beautiful Material-UI components
- Redux state management
- Fast and efficient

## Technologies Used

- React
- Redux Toolkit
- Material-UI (MUI)
- React Router
- date-fns
- Emotion (for styling)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anurag-chandra9/Task_management.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-management-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Features in Detail

### Task Management
- Create new tasks with title, description, and due date
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as completed
- View task details

### Filtering and Sorting
- Filter tasks by:
  - All Tasks
  - Completed Tasks
  - Pending Tasks
  - Overdue Tasks
  - Upcoming Tasks
- Sort tasks by:
  - Due Date
  - Creation Date
  - Title

### Dashboard Statistics
- Total tasks count
- Completed tasks
- Pending tasks
- Overdue tasks
- Upcoming tasks

### UI/UX Features
- Responsive design for all screen sizes
- Animated components
- Modern gradient effects
- Intuitive task status indicators
- Clean and minimalist design

## Project Structure

```
src/
├── app/
│   └── store.js
├── components/
│   ├── AddTaskForm/
│   ├── EditTaskForm/
│   ├── TaskDashboard/
│   ├── TaskList/
│   └── Footer/
├── features/
│   └── tasks/
│       └── tasksSlice.js
├── theme/
│   └── theme.js
└── App.js
```

## Deployment

The application is deployed on Vercel. You can view the live version at:
[Task Management Dashboard](https://task-management-dashboard-anurag.vercel.app)

### Deployment Steps
1. Push your changes to GitHub
2. Vercel automatically deploys from the main branch
3. View deployment logs in Vercel dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Anurag Chandra**
- GitHub: [@anurag-chandra9](https://github.com/anurag-chandra9)
- LinkedIn: [Anurag Chandra](https://www.linkedin.com/in/anurag-chandra9/)

## Acknowledgments

- Material-UI for the amazing component library
- React team for the awesome framework
- Redux team for state management solutions
