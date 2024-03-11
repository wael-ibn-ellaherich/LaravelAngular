import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    priority: 1,
    due_date: this.getFormattedDate(),
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    this.taskService.addTask(this.newTask).subscribe((task) => {
      console.log('Nouvelle tâche ajoutée :', task);
      this.loadTasks(); // Recharger la liste après l'ajout
      this.newTask = {  // Réinitialiser les valeurs du formulaire
        title: '',
        description: '',
        priority: 1,
        due_date: this.getFormattedDate(),
      };
    });
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  getFormattedDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Janvier est 0 !
    let dd: any = today.getDate();

    if (mm < 10) {
      mm = '0' + mm;
    }

    if (dd < 10) {
      dd = '0' + dd;
    }

    return ${yyyy}-${mm}-${dd};
  }

  editTask(task: Task) {
    console.log('Edit Task:', task);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log('Tâche supprimée');
      this.loadTasks();
    });
  }

  updateTaskCompletion(task: Task) {

    console.log('Update Task Completion:', task);
  }

  isFormValid(): boolean {
    return true;
  }
}
