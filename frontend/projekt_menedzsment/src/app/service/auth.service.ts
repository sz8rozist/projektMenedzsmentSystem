import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Response } from '../model/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  signin(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/login`, user);
  }

  isAuthenticated() {
    const login = localStorage.getItem('login');
    if (login) {
      const json = JSON.parse(login);
      const token = json.token;
      return token && !this.jwtHelper.isTokenExpired(token);
    }
  }

  getDecodedToken() {
    const login = localStorage.getItem('login');
    if(login){
      const token = JSON.parse(login).token;
      return this.jwtHelper.decodeToken(token as string);
    }
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/signin']);
  }

  signup(user: User) {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  usernameIsExsits(username: string) {
    return this.http.get<boolean>(`${this.baseUrl}/${username}`, {
      observe: 'response',
    });
  }

  loadImage(imageName: string){
    return this.http.get(`${this.baseUrl}/images/${imageName}`, {responseType: "blob" as "json"});
  }

  loggedUser() : User{
    const login = JSON.parse(localStorage.getItem('login') as string);
    const user: User = {
      id: login.id,
      username: login.username,
      email: login.email,
    };
    return user;
  }
}
