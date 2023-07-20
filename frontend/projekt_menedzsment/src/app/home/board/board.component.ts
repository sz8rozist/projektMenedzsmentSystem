import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Board, NewBoard } from 'src/app/model/Board';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  board: Board[] = [];

  boardForm: FormGroup;

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(
    private projektService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.boardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadBoard();
  }

  loadBoard() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.projektService.listBoard(Number(id)).subscribe((result) => {
      this.board = [...result];
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    //console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      var destinationColumnId = event.container.id.split('-').pop(); // Cél oszlop azonosítója
      var destinationColumn = undefined;
      for (const key in this.board) {
        if (key == destinationColumnId) {
          destinationColumn = this.board[key].id;
        }
      }
      var boardColumn = {
        id: '',
        board_id: destinationColumn,
      };
      for (const [key, value] of Object.entries(event.previousContainer.data)) {
       // console.log(key, value);
        boardColumn.id = value.id;
      }

      this.projektService
        .updateBoardColumn(boardColumn.id, boardColumn.board_id)
        .subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const projekt_id = this.route.snapshot.paramMap.get('id');
      const board: NewBoard = {
        name: this.boardForm.get('name')?.value,
      };
      this.projektService.newBoard(board, Number(projekt_id)).subscribe(
        (result) => {
          console.log(result);
          this.boardForm.reset();
          this.loadBoard();
        },
        (error) => console.log(error)
      );
    }
  }

  onDelete(id: any) {
    this.projektService.deleteBoard(id).subscribe(
      (result) => {
        console.log(result);
        this.loadBoard();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
