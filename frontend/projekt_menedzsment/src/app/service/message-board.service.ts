import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProjection } from '../model/UserProjection';

@Injectable({
  providedIn: 'root'
})
export class MessageBoardService {

  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
  ) {}

  allUser(userId: number){
    return this.http.get<UserProjection[]>(`${this.baseUrl}/users/all/` + userId);
  }

}
