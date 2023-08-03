import { Component } from '@angular/core';
import { Projekt } from 'src/app/model/Projekt';
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

  constructor(
    private authService: AuthService,
    private projektService: ProjectService
  ){}
 
  ngOnInit(){
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

  onNewProjektAdded(newProjekt: Projekt) {
    console.log(newProjekt);
    this.projects.push(newProjekt);
  }
}
