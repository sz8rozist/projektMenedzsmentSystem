import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projekt } from '../model/Projekt';
import { Board, NewBoard } from '../model/Board';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl="http://localhost:8080/api";

  constructor(
    private http: HttpClient,
    ){}

  listProject(id: number){
    return this.http.get<Projekt[]>(`${this.baseUrl}/projekt/`+id);
  }

  listBoard(projekt_id: number){
    return this.http.get<Board[]>(`${this.baseUrl}/board/`+ projekt_id);
  }

  updateBoardColumn(column_id: string, board_id : any){
    return this.http.put(`${this.baseUrl}/boardColumn/`+ column_id, board_id);
  }

  newBoard(board: NewBoard, projekt_id: number){
    return this.http.post<NewBoard>(`${this.baseUrl}/board/`+ projekt_id, board);
  }
  deleteBoard(id: number){
    return this.http.delete(`${this.baseUrl}/board/`+ id);
  }

}
