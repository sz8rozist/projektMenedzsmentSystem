import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Projekt } from 'src/app/model/Projekt';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Output() closeDrawer = new EventEmitter<void>();
  @Input() showDrawer?: boolean;
  @Output() newProjektEvent = new EventEmitter<Projekt>();

  projektForm: FormGroup;

  constructor(private projektService: ProjectService,
    private authService: AuthService) {
    this.projektForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  close() {
    this.closeDrawer.emit();
  }

  onSubmit(){
    if(this.projektForm.valid){
      const user: User = this.authService.loggedUser();
      const projekt: Projekt = {
        name: this.projektForm.get('name')?.value,
        description: this.projektForm.get('description')?.value,
      }
      this.projektService.newProjekt(projekt, user.id as number).subscribe(response =>{
        if(response){
          this.closeDrawer.emit();
          this.newProjektEvent.emit(response);
          console.log(response);
        }
      },error =>{console.log(error)});
    }
  }
}
