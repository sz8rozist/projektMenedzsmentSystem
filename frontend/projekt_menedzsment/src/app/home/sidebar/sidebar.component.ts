import { Component } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ImgUploadService } from 'src/app/service/img-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isVisibleProfile: boolean = false;
  isVisibleSidebar: boolean = false;
  imageUrl?: string;
  user?: User;

  constructor(
    private authService: AuthService,
    private imgUploadService: ImgUploadService
  ) {}

  onLogout() {
    this.authService.logout();
  }
  toggleSidebarVisibility() {
    this.isVisibleSidebar = !this.isVisibleSidebar;
  }
  toggleProfileVisibility() {
    this.isVisibleProfile = !this.isVisibleProfile;
  }

  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    this.user = this.authService.loggedUser();
  }
}
