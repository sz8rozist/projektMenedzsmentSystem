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
  signinForm: FormGroup;

  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      this.router.navigate(['/home']);
    }
  }

  onSignin() {
    if (this.signinForm.valid) {
      const user: User = {
        username: this.signinForm.get('username')?.value as string,
        password: this.signinForm.get('password')?.value as string,
      };
      this.authService.signin(user).subscribe(
        (response: any) => {
          if (response.token != null) {
            const user = {token: response.token, username: response.user.username, email: response.user.email, img: response.user.img, id: response.user.id}
            localStorage.setItem('login', JSON.stringify(user));
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
}
