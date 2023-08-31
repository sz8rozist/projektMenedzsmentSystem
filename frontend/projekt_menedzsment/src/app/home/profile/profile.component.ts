import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/custom-validators/new-password-validators';
import { ChangePassword } from 'src/app/model/ChangePassword';
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
  userProfileForm: FormGroup;
  successUpdateProfile: boolean = false;
  successChangePw: boolean = false;
  errorChangePw: boolean = false;
  changePwMessage: string = "";
  user?: User;
  passwordForm: FormGroup;
  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService,
  ) {
    this.userProfileForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
    });
    this.passwordForm = new FormGroup({
      old_pw: new FormControl('',[Validators.required]),
      new_pw: new FormControl('', [Validators.required]),
      confirm_new_pw: new FormControl('', [Validators.required])
    }, {validators: passwordMatchValidator})
  }

  ngOnInit() {
    this.imgUploadService.getImageUrl().subscribe((response) => {
      if (response && response != null) {
        this.imageUrl = response;
      }
    });
    this.fetchUserData();
  }

  fetchUserData() {
    const loggedUserId = this.authService.loggedUserID();
    this.authService.getUserById(Number(loggedUserId)).subscribe((response) => {
      if (response) {
        this.user = response;
        this.userProfileForm.patchValue({
          id: response.id,
          username: response.username,
          email: response.email,
          first_name: response.firstName,
          last_name: response.lastName,
          post: response.post,
        });
      }
    });
  }

  onSubmitUserProfileForm() {
    if (this.userProfileForm.valid) {
      const user: User = {
        id: this.userProfileForm.get('id')?.value,
        username: this.userProfileForm.get('username')?.value,
        email: this.userProfileForm.get('email')?.value,
        firstName: this.userProfileForm.get('first_name')?.value,
        lastName: this.userProfileForm.get('last_name')?.value,
        post: this.userProfileForm.get('post')?.value
      };
      this.authService.updateUser(user).subscribe(response =>{
        console.log(response)
        if(response){
          this.successUpdateProfile = true;
        }
      }, error =>{
        console.log(error)
      })
    }
  }

  onSubmitPasswordChange(){
    if(this.passwordForm.valid){
      const data: ChangePassword = {
        userId: this.user?.id as number,
        oldPassword: this.passwordForm.get('old_pw')?.value,
        newPassword: this.passwordForm.get('new_pw')?.value,
      }
      this.authService.changePassword(data).subscribe((response: any) =>{
        console.log(response.error);
        if(response.error){
          this.errorChangePw = true;
          this.changePwMessage = response.error;
        }else{
          this.changePwMessage = response.success;
          this.successChangePw = true;
        }
        this.passwordForm.reset();
      });
    }
  }
}
