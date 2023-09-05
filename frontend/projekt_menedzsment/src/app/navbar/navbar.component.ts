import { Component, Input } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isVisibleProfile: boolean = false;
  @Input() imageUrl?: string;
  @Input() user?: User;

  constructor(
    private authService: AuthService,
  ) {}

  onLogout() {
    this.authService.logout();
  }

  toggleProfileVisibility() {
    this.isVisibleProfile = !this.isVisibleProfile;
  }
}
