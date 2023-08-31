import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projekt } from '../model/Projekt';
import { Board, NewBoard } from '../model/Board';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl="http://localhost:8080";

  constructor(
    private http: HttpClient,
    ){}

  listProject(id: number){
    return this.http.get<Projekt[]>(`${this.baseUrl}/projekt/`+id);
  }

  listBoard(projekt_id: number){
    return this.http.get<Board[]>(`${this.baseUrl}/board/`+ projekt_id);
  }

  newBoard(board: NewBoard, projekt_id: number){
    return this.http.post<NewBoard>(`${this.baseUrl}/board/`+ projekt_id, board);
  }

  deleteBoard(id: number){
    return this.http.delete(`${this.baseUrl}/board/`+ id);
  }

  newProjekt(projekt: Projekt, user_id: number){
    return this.http.post<Projekt>(`${this.baseUrl}/projekt/${user_id}`, projekt);
  }


}
