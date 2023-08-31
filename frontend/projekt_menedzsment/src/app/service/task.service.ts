import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl="http://localhost:8080";
  constructor(
    private http: HttpClient,
  ) { }

  
  updateTask(column_id: string, board_id : any){
    return this.http.put(`${this.baseUrl}/task/`+ column_id, board_id);
  }

  newTask(task: Task){
    return this.http.post(`${this.baseUrl}/task/` + task.board_id, task);
  }
}
