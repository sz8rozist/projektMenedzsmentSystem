import { Component } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ImgUploadService } from 'src/app/service/img-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  imageUrl?: string;
  user?: User;
  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    this.user = this.authService.loggedUser();
  }
}
