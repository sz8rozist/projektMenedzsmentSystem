import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Response } from '../model/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl="http://localhost:8080/api/auth/login";

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    ){}

  signin(user: User): Observable<Response>{
    return this.http.post<Response>(`${this.baseUrl}`, user);
  }

  isAuthenticated(){
    const token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken(){
    const token = localStorage.getItem("token");
    return this.jwtHelper.decodeToken(token as string);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/signin"]);
  }
}
