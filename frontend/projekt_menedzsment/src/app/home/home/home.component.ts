import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Projekt } from 'src/app/model/Projekt';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = "";
  projects: Projekt[] = [];
  showDrawer = false;
  projektForm: FormGroup;
  constructor(
    private authService: AuthService,
    private projektService: ProjectService
  ){
    this.projektForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }
 
  ngOnInit(){
   this.loadProjekt();
  }

  loadProjekt(){
    const token = this.authService.getDecodedToken();
    this.username = token.sub;
    this.projektService.listProject(token.sub).subscribe(project => {
      this.projects = [... project];
    });
  }

  onLogout(){
    this.authService.logout();
  }

  openDrawer() {
    this.showDrawer = true;
  }

  closeDrawer() {
    this.showDrawer = false;
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
          this.closeDrawer();
          this.loadProjekt();
          console.log(response);
        }
      },error =>{console.log(error)});
    }
  }

  onNewProjektAdded(newProjekt: Projekt) {
    console.log(newProjekt);
    this.projects.push(newProjekt);
  }
}
