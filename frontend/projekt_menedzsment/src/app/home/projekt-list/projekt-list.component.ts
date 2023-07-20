import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Projekt } from 'src/app/model/Projekt';

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  styleUrls: ['./projekt-list.component.css']
})
export class ProjektListComponent {

  @Input() projects?: Projekt[];

  constructor(private router: Router){}

  loadBoard(project: Projekt){
    this.router.navigate(["/home/board",project.id]);
  }
}
