import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserProjection } from 'src/app/model/UserProjection';
import { AuthService } from 'src/app/service/auth.service';
import { ImgUploadService } from 'src/app/service/img-upload.service';
import { MessageBoardService } from 'src/app/service/message-board.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent {
  imageUrl?: string;
  user?: User;
  users: UserProjection[] = [];
  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService,
    private messageBoardService: MessageBoardService
  ) {}

  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    const user = this.authService.loggedUser();
    this.user = user;
    this.messageBoardService
      .allUser(user.id as number)
      .subscribe((result: UserProjection[]) => {
        this.users = result;
        this.loadProfileImages();
      });
  }

  loadProfileImages() {
    this.users.forEach((user) => {
      this.getProfileImage(user);
    });
  }

  getProfileImage(user: UserProjection) {
    this.imgUploadService.getImageUrl(user.img).subscribe((response) => {
      if (response != null) {
        user.img = response;
      }
    });
  }
}
