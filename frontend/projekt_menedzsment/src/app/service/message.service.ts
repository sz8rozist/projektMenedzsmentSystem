import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProjection } from '../model/UserProjection';
import { Message } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
  ) {}

  allUser(userId: number){
    return this.http.get<UserProjection[]>(`${this.baseUrl}/users/all/` + userId);
  }
  getMessages(senderId: number, receiverId: number){
    return this.http.get<Message[]>(`${this.baseUrl}/messages/`+ senderId + '/'+ receiverId);
  }

  sendMessage(message: Message){
    return this.http.post(`${this.baseUrl}/messages`, message);
  }

  getReadedMessage(senderId: number, receiverId: number, readed:boolean){
    return this.http.get<number>(`${this.baseUrl}/messages/readed/${senderId}/${receiverId}?read=${readed}`);
  }

  markReadedMessage(senderId: number, receiverId: number){
    return this.http.get(`${this.baseUrl}/messages/mark/${senderId}/${receiverId}`);
  }

}
