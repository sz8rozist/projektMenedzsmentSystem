import { Component } from '@angular/core';
import { ImgUploadService } from './service/img-upload.service';
import { User } from './model/User';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageUrl?: string;
  user?: User; 


 
  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService
  ){}
  
  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    this.user = this.authService.loggedUser();
  }


}
