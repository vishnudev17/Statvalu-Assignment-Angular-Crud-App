import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models';
import { InputComponent } from '../shared/input/input.component';
import { DropdownComponent, DropdownOption } from '../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: string | null = null;
  
  priorityOptions: DropdownOption[] = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
  ];
  
  statusOptions: DropdownOption[] = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In-Progress', label: 'In-Progress' },
    { value: 'Completed', label: 'Completed' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      employeeName: [''],
      priority: ['Medium'],
      status: ['Pending'],
      dueDate: ['']
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      const task = this.taskService.getTaskById(this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      if (this.isEditMode && this.taskId) {
        const updatedTask: Task = {
          ...formValue,
          id: this.taskId
        };
        this.taskService.updateTask(updatedTask);
      } else {
        this.taskService.addTask(formValue);
      }
      
      this.router.navigate(['/tasks']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}