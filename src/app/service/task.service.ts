  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Task } from '../Model/Task';

  @Injectable({
    providedIn: 'root'
  })
  export class TaskService {
    private apiUrl = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }

    getAllTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}tasks`);
    }

    addTask(task: Task): Observable<Task> {
      return this.http.post<Task>(`${this.apiUrl}addTask`, task);
    }

    updateTask(task: Task): Observable<Task> {
      const url = `${this.apiUrl}tasks/${task.id}`;
      return this.http.put<Task>(url, task);
    }

    deleteTask(taskId: number): Observable<void> {
      const url = `${this.apiUrl}tasks/${taskId}`;
      return this.http.delete<void>(url);
    }
  }
