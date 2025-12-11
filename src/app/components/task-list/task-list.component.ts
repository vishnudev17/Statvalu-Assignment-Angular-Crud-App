import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    StatusBadgeComponent,
    DialogComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];
  searchTerm = '';
  statusFilter = '';
  priorityFilter = '';
  sortBy = '';
  loading = false;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  
  // Dialog
  showDeleteDialog = false;
  taskToDelete: Task | null = null;
  
  // Stats
  taskStats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateStats();
      this.applyFilters();
      this.loading = false;
    });
  }
  
  updateStats(): void {
    this.taskStats = this.taskService.getTaskStats();
  }

  applyFilters(): void {
    let filtered = [...this.tasks];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(term) ||
        task.employeeName.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }
    
    // Priority filter
    if (this.priorityFilter) {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }

    this.filteredTasks = filtered;
    this.applySorting();
    this.updatePagination();
  }
  
  applySorting(): void {
    if (!this.sortBy) return;
    
    this.filteredTasks.sort((a, b) => {
      switch (this.sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    this.updatePagination();
  }
  
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTasks.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  
  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
  
  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.itemsPerPage, this.filteredTasks.length);
  }
  
  formatDate(dateString: string): string {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  confirmDelete(task: Task): void {
    this.taskToDelete = task;
    this.showDeleteDialog = true;
  }
  
  deleteTask(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id);
      this.showDeleteDialog = false;
      this.taskToDelete = null;
    }
  }
  
  cancelDelete(): void {
    this.showDeleteDialog = false;
    this.taskToDelete = null;
  }
  
  getDeleteMessage(): string {
    return `Are you sure you want to delete "${this.taskToDelete?.title || ''}"? This action cannot be undone.`;
  }
}