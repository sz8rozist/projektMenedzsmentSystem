import { AuthService } from '../service/auth.service';
import { User } from '../model/User';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      this.router.navigate(['/home']);
    }
  }

  onSignin() {
    const user: User = {
      username: this.signinForm.get('username')?.value as string,
      password: this.signinForm.get('password')?.value as string,
    };
    this.authService.signin(user).subscribe(
      (response) => {
        console.log(response);
        if (response.token != null) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          //Sikertelen login
          this.errorMsg = 'Sikertelen bejelentkezés';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
