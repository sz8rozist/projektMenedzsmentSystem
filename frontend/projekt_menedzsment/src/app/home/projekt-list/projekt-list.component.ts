import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projekt } from 'src/app/model/Projekt';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  styleUrls: ['./projekt-list.component.css'],
})
export class ProjektListComponent {
  @Input() projects: Projekt[] = [];
  @Output() drawerEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();
  @Input() pageSize?: number;
  @Input() totalPages?: number;
  @Input() currentPage: number = 0;
  @Input() recordCount?: number;
  @Output() changePageEvent = new EventEmitter<number>();
  @Output() openUpdateDrawer = new EventEmitter<Projekt>();
  pages: number[] = [];
  showDrawer: boolean = false;


  constructor(private router: Router, private projektService: ProjectService) {
  
  }

  loadBoard(project: Projekt) {
    this.router.navigate(['/home/board', project.id]);
  }

  ngOnInit() {
    if (this.totalPages) {
      for (var i = 0; i < this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }

  onPageChange(page: number) {
    this.changePageEvent.emit(page);
    this.currentPage = page;
  }

  openDrawer() {
    this.drawerEvent.emit();
  }

  previousPage() {
    if (this.currentPage && this.currentPage != 0) {
      this.currentPage--;
      this.changePageEvent.emit(this.currentPage);
    }
  }
  nextPage() {
    if (this.totalPages && this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.changePageEvent.emit(this.currentPage);
    }
  }

  navigateToBoard(boardId: any) {
    this.router.navigate(['home//board', boardId]);
  }

  deleteProjekt(projekt: Projekt) {
    this.projektService
      .deleteProjekt(projekt.id as number)
      .subscribe((response) => {
        this.deleteEvent.emit();
      });
  }

  openEditDrawer(projekt: Projekt){
    this.openUpdateDrawer.emit(projekt);
  }

  navigateToFiles(projekt: Projekt){
    this.router.navigate(["/home/files", projekt.id]);
  }
}
