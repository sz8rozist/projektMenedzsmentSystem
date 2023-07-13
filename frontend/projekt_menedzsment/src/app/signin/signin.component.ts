

import { AuthService } from '../service/auth.service';
import { User } from '../model/User';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { Response } from '../model/LoginResponse';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errorMsg : string = "";

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  ngOnInit(){
    console.log("init");
  }

  onSignin(){
    const user: User = {
      username: this.signinForm.get('username')?.value as string,
      password: this.signinForm.get('password')?.value as string,
    }
    this.authService.signin(user).subscribe(
      (response: Response) => {
        if(response.statusCode === 200){
          localStorage.setItem("token", response.jwtToken);
          timer(500).subscribe(() => { 
            this.router.navigate(["/home"]);
          });
        }else{
          //Sikertelen login
          timer(500).subscribe(() => {
            this.errorMsg = response.message;
          });
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
