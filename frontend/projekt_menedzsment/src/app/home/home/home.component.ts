import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Projekt } from 'src/app/model/Projekt';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  projects: Projekt[] = [];
  showDrawer = false;
  projektForm: FormGroup;
  currentPage = 0;
  pageSize = 5;
  numberOfElements?: number;
  recordCount?: number;
  totalPages = 0;
  showUpdateDrawer = false;
  updateProjektForm: FormGroup;
  isHovered = false;
  constructor(
    private authService: AuthService,
    private projektService: ProjectService
  ) {
    this.projektForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
    this.updateProjektForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadProjekt();
  }

  loadProjekt() {
    this.projektService
      .listProject(this.currentPage, this.pageSize)
      .subscribe((project: any) => {
        this.recordCount = project.recordCount;
        this.numberOfElements = project.response.numberOfElements;
        this.totalPages = project.response.totalPages;
        this.projects = [...project.response.content];
      });
  }

  onLogout() {
    this.authService.logout();
  }

  openDrawer() {
    this.showDrawer = true;
  }
  openUpdateDrawer(projekt: Projekt) {
    console.log(projekt);
    this.updateProjektForm.patchValue({id: projekt.id, name: projekt.name, description: projekt.description});
    this.showUpdateDrawer = true;
  }

  closeUpdateDrawer() {
    this.showUpdateDrawer = false;
  }

  closeDrawer() {
    this.showDrawer = false;
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadProjekt();
  }

  onSubmit() {
    if (this.projektForm.valid) {
      const user: User = this.authService.loggedUser();
      const projekt: Projekt = {
        name: this.projektForm.get('name')?.value,
        description: this.projektForm.get('description')?.value,
      };
      this.projektService.newProjekt(projekt, user.id as number).subscribe(
        (response) => {
          if (response) {
            this.closeDrawer();
            this.loadProjekt();
            console.log(response);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onNewProjektAdded(newProjekt: Projekt) {
    console.log(newProjekt);
    this.projects.push(newProjekt);
  }

  deleteProjekt() {
    this.loadProjekt();
  }

  onUpdateSubmit() {
    if (this.updateProjektForm.valid) {
      const projekt: Projekt = {
        id: this.updateProjektForm.get('id')?.value,
        name: this.updateProjektForm.get('name')?.value,
        description: this.updateProjektForm.get('description')?.value,
      };
      this.projektService.updateProjekt(projekt).subscribe((response) => {
        if (response) {
          this.closeUpdateDrawer();
          this.loadProjekt();
        }
      });
    }
  }

  addClass(){
    this.isHovered = true;
  }
  removeClass(){
    this.isHovered = false;
  }
}
