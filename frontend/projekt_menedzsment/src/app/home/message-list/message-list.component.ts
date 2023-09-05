import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/model/Message';
import { User } from 'src/app/model/User';
import { UserProjection } from 'src/app/model/UserProjection';
import { AuthService } from 'src/app/service/auth.service';
import { ImgUploadService } from 'src/app/service/img-upload.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  @Input() selectedUser?: UserProjection;
  @Output() selectedUserAfterMarkMessage = new EventEmitter<void>();
  messages: Message[] = [];
  senderUser?: User;
  messageForm: FormGroup;
  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private imgUploadService: ImgUploadService
  ) {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadMessages();
    if(this.selectedUser?.readedMessage && this.selectedUser.readedMessage > 0){
      this.messageService.markReadedMessage(Number(this.selectedUser?.id), Number(this.senderUser?.id)).subscribe(response =>{
        if(response && this.selectedUser){
          this.sendDataToParent(this.selectedUser);
        }
      });
    }
  }

  sendDataToParent(user: UserProjection){
    user.readedMessage = 0;
    this.selectedUserAfterMarkMessage.emit();
  }

  loadMessages() {
    const senderUser = this.authService.loggedUser();
    this.senderUser = senderUser;
    if (senderUser.id && this.selectedUser?.id) {
      console.log(senderUser.id, this.selectedUser?.id);
      this.messageService
        .getMessages(senderUser.id, Number(this.selectedUser.id))
        .subscribe((messages: Message[]) => {
          this.messages = messages;
          this.loadProfileImage();
        });
    }
  }

  loadProfileImage() {
    this.messages.forEach((message) => {
      this.getProfileImage(message.receiver);
      this.getProfileImage(message.sender);
    });
  }

  getProfileImage(user: User) {
    this.imgUploadService.getImageUrl(user.img).subscribe((response) => {
      if (response != null) {
        user.img = response;
      }
    });
  }

  async sendMessage() {
    if (this.messageForm.valid) {
      const sender = await this.authService
        .getUserById(Number(this.senderUser?.id))
        .toPromise();
      const receiver = await this.authService
        .getUserById(Number(this.selectedUser?.id))
        .toPromise();
      if (sender && receiver) {
        const message: Message = {
          content: this.messageForm.get('message')?.value,
          sender: sender,
          receiver: receiver,
          readed: false,
        };
        this.messageService.sendMessage(message).subscribe((response) => {
          if (response) {
            this.loadMessages();
            this.messageForm.reset();
          }
        });
      }
    }
  }
}
