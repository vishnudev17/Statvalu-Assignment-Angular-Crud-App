import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'employee_tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private loading = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadTasksFromStorage();
  }

  private loadTasksFromStorage(): void {
    this.loading.next(true);
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const tasks = stored ? JSON.parse(stored) : this.getDefaultTasks();
      this.tasksSubject.next(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.tasksSubject.next(this.getDefaultTasks());
    }
    this.loading.next(false);
  }

  private saveTasksToStorage(tasks: Task[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
      this.tasksSubject.next(tasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  private getDefaultTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Employee Dashboard Angular setup task statvalu',
        description: 'Task assigned to me to create a angular project that manages employee tasks',
        employeeName: 'Vishnu M',
        status: 'Completed',
        dueDate: '2024-01-15',
        priority: 'High'
      },
      {
        id: '2',
        title: 'CRUD Operations for Task Management',
        description: 'Build CRUD operations for task management',
        employeeName: 'Arpita Dey',
        status: 'In-Progress',
        dueDate: '2024-01-25',
        priority: 'Medium'
      },
      {
        id: '3',
        title: 'UI Component Testing',
        description: 'Test all UI components and user interactions',
        employeeName: 'jINU Mathew',
        status: 'Pending',
        dueDate: '2024-01-30',
        priority: 'Low'
      }
    ];
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  addTask(task: Omit<Task, 'id'>): void {
    const tasks = this.tasksSubject.value;
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    const updatedTasks = [...tasks, newTask];
    this.saveTasksToStorage(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      this.saveTasksToStorage(updatedTasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.tasksSubject.value;
    const updatedTasks = tasks.filter(t => t.id !== id);
    this.saveTasksToStorage(updatedTasks);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.value.find(t => t.id === id);
  }

  getTaskStats() {
    const tasks = this.tasksSubject.value;
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'Completed').length,
      inProgress: tasks.filter(t => t.status === 'In-Progress').length,
      pending: tasks.filter(t => t.status === 'Pending').length
    };
  }
}