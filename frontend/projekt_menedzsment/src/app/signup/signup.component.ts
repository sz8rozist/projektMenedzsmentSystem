import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImgUploadService } from '../service/img-upload.service';
import { AuthService } from '../service/auth.service';
import { CustomValidators } from '../custom-validators/custom-validators';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  selectedFile?: File;
  userExsits: boolean = false;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  constructor(
    private imgUploadService: ImgUploadService,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required], asyncValidators: [CustomValidators.userExistsValidator(this.authService)], updateOn: 'blur'}),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      profile_img: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.signupForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.imgUploadService.uploadImage(formData).subscribe((response) =>{
        if(response.fileName){
          this.onSignup(response.fileName);
        }
      }, (error) =>{console.log(error)});

    }
  }

  onSignup(imageFilename: string){
    const user: User = {
      username: this.signupForm.get('username')?.value,
      password: this.signupForm.get('password')?.value,
      email: this.signupForm.get('email')?.value,
      img: imageFilename
    }
    this.authService.signup(user).subscribe((response) =>{
      console.log(response);
      this.router.navigateByUrl("/signin");
    }, error =>{
      console.log(error);
    })
  }
}
