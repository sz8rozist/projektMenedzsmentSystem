import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string = "";

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    console.log("initt");
    const token = this.authService.getDecodedToken();
    this.username = token.sub;
  }

  onLogout(){
    this.authService.logout();
  }
}
