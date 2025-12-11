# Employee Task Dashboard

A comprehensive Angular application for managing employee tasks with CRUD operations, filtering, sorting, and reusable components.

## 🚀 Features

### Core Functionality
- **Task Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Dashboard**: Overview with task statistics and counts
- **Search & Filter**: Search by title/employee name, filter by status and priority
- **Sorting**: Sort tasks by due date, priority, or title
- **Pagination**: Client-side pagination for better performance
- **LocalStorage**: Persistent data storage that survives page refreshes

### Reusable Components
- **Input Component**: Reusable form input with validation support
- **Dropdown Component**: Configurable select dropdown
- **Status Badge Component**: Visual status indicators
- **Dialog Component**: Confirmation dialogs for destructive actions

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during data operations
- **Empty States**: Helpful messages when no data is available
- **Error Handling**: Graceful error handling throughout the app
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Technology Stack

- **Angular 17+**: Latest Angular framework
- **TypeScript**: Type-safe development
- **Reactive Forms**: Form handling and validation
- **RxJS**: Reactive programming for data management
- **CSS3**: Modern styling with Flexbox and Grid
- **LocalStorage API**: Client-side data persistence

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── shared/
│   │   │   ├── input/           # Reusable input component
│   │   │   ├── dropdown/        # Reusable dropdown component
│   │   │   ├── status-badge/    # Status badge component
│   │   │   └── dialog/          # Confirmation dialog component
│   │   ├── task-form/           # Add/Edit task form
│   │   └── task-list/           # Task list with dashboard
│   ├── models/
│   │   ├── task.model.ts        # Task interface definition
│   │   └── index.ts             # Model exports
│   ├── services/
│   │   └── task.service.ts      # Task data service
│   ├── app.component.*          # Root component
│   ├── app.config.ts            # App configuration
│   └── app.routes.ts            # Routing configuration
├── assets/                      # Static assets
├── styles.css                   # Global styles
└── index.html                   # Main HTML file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v17 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task_crud_app_statvalu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Usage Guide

### Dashboard
- View task statistics (Total, Completed, In Progress, Pending)
- Quick overview of all tasks with status indicators
- Access to add new tasks and manage existing ones

### Adding Tasks
1. Click "Add New Task" button
2. Fill in the required information:
   - **Title** (Required)
   - **Description** (Optional)
   - **Employee Name** (Optional)
   - **Priority** (Low/Medium/High)
   - **Status** (Pending/In-Progress/Completed)
   - **Due Date** (Optional)
3. Click "Create Task" to save

### Editing Tasks
1. Click the edit icon (✎) next to any task
2. Modify the task information
3. Click "Update Task" to save changes

### Deleting Tasks
1. Click the delete icon (🗑) next to any task
2. Confirm deletion in the dialog
3. Task will be permanently removed

### Filtering and Searching
- **Search**: Type in the search box to find tasks by title, description, or employee name
- **Status Filter**: Filter tasks by their current status
- **Priority Filter**: Filter tasks by priority level
- **Sort**: Sort tasks by due date, priority, or title

### Pagination
- Navigate through pages using Previous/Next buttons
- View current page information and total results
- 10 tasks displayed per page by default

## 🎨 Design Features

### Visual Elements
- **Color-coded Status Badges**: Easy identification of task status
- **Priority Indicators**: Visual priority levels with appropriate colors
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Professional Typography**: Clean, readable fonts

### User Interface
- **Intuitive Navigation**: Clear navigation with active states
- **Consistent Styling**: Uniform design language throughout
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Mobile-First**: Responsive design that works on all devices

## 🔧 Configuration

### Task Service Configuration
The `TaskService` includes default sample tasks for demonstration. You can modify these in the `getDefaultTasks()` method.

### Pagination Settings
Adjust the `itemsPerPage` property in `TaskListComponent` to change the number of tasks displayed per page.

### Styling Customization
- Global styles are in `src/styles.css`
- Component-specific styles are in each component file
- CSS custom properties can be added for theme customization

## 🧪 Testing

### Running Unit Tests
```bash
ng test
```

### Running End-to-End Tests
```bash
ng e2e
```

## 📈 Performance Features

- **Lazy Loading**: Components are loaded on demand
- **Change Detection**: Optimized change detection strategy
- **Client-side Pagination**: Reduces DOM elements for better performance
- **Efficient Filtering**: Optimized search and filter algorithms
- **LocalStorage Caching**: Fast data retrieval from local storage

## 🔒 Data Persistence

All task data is stored in the browser's LocalStorage, which means:
- Data persists between browser sessions
- No server required for basic functionality
- Data is specific to each browser/device
- Clearing browser data will reset the tasks

## 🌟 Future Enhancements

Potential improvements that could be added:
- **Backend Integration**: Connect to a REST API or GraphQL endpoint
- **User Authentication**: Multi-user support with login/logout
- **Task Categories**: Organize tasks into categories or projects
- **Due Date Notifications**: Alerts for approaching deadlines
- **Task Comments**: Add comments and notes to tasks
- **File Attachments**: Attach files to tasks
- **Export/Import**: Export tasks to CSV or import from external sources
- **Dark Mode**: Theme switching capability
- **Drag & Drop**: Reorder tasks with drag and drop
- **Advanced Reporting**: Charts and analytics for task completion

## 🐛 Known Issues

- LocalStorage has size limitations (typically 5-10MB)
- Data is not synchronized across different browsers or devices
- No offline functionality beyond LocalStorage

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Development Notes

This application was built following Angular best practices:
- **Standalone Components**: Using Angular's standalone component architecture
- **Reactive Forms**: Proper form validation and handling
- **Service Architecture**: Separation of concerns with dedicated services
- **TypeScript**: Full type safety throughout the application
- **Modern CSS**: Flexbox, Grid, and CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels and keyboard navigation support

## 📞 Support

For any questions or issues, please refer to the Angular documentation or create an issue in the project repository.

---

**Built with ❤️ using Angular**