import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserProjection } from 'src/app/model/UserProjection';
import { AuthService } from 'src/app/service/auth.service';
import { ImgUploadService } from 'src/app/service/img-upload.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent {
  imageUrl?: string;
  user?: User;
  users: UserProjection[] = [];
  selectedUser?: UserProjection;
  readedMessageCount: number = 0;
  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    this.loadUsers();
  }

  loadUsers(){
    const user = this.authService.loggedUser();
    this.user = user;
    this.messageService
      .allUser(user.id as number)
      .subscribe((result: UserProjection[]) => {
        this.users = result;
        //this.selectedUser = result[0];
        this.loadProfileImages();
        this.loadReadedMessage();
      });
  }

  loadProfileImages() {
    this.users.forEach((user) => {
      this.getProfileImage(user);
    });
  }

  loadReadedMessage(){
    this.users.forEach((user) =>{
      this.getReadedMessage(user);
    });
  }

  getReadedMessage(user: UserProjection){
    this.messageService.getReadedMessage(Number(user.id), Number(this.user?.id), false).subscribe((response: number) =>{
      if(response != null){
        user.readedMessage = response;
      }
    });
  }

  getProfileImage(user: UserProjection) {
    this.imgUploadService.getImageUrl(user.img).subscribe((response) => {
      if (response != null) {
        user.img = response;
      }
    });
  }

  onSelected(user: UserProjection){
    this.selectedUser = user;
    this.readedMessageCount = user.readedMessage as number;
  }

  receiveDataFromChild() {
    this.loadUsers();
  }
}
