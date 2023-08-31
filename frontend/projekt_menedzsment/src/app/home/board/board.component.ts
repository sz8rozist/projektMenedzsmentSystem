import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Board, NewBoard } from 'src/app/model/Board';
import { Task } from 'src/app/model/Task';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  board: Board[] = [];

  boardForm: FormGroup;
  boardTaskForm: FormGroup;

  showModal:boolean = false;
  showTaskModal:boolean = false;

  modalTask?: Task;

  openModal() {
    this.showModal = true;
  }

  openTaskModal(task: Task){
    this.modalTask = task;
    this.showTaskModal = true;
  }

  closeTaskModal(){
    this.showTaskModal = false;
  }

  closeModal() {
    this.showModal = false;
  }
  constructor(
    private projektService: ProjectService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.boardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.boardTaskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      deadline: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
      board_id: new FormControl('',)
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
      var task = {
        id: '',
        board_id: destinationColumn,
      };
      for (const [key, value] of Object.entries(event.previousContainer.data)) {
       // console.log(key, value);
       task.id = value.id;
      }

      this.taskService
        .updateTask(task.id, task.board_id)
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

  onSubmitTaskForm(){
    if(this.boardTaskForm.valid){
      console.log(this.boardTaskForm.get('name')?.value, this.boardTaskForm.get('description')?.value, this.boardTaskForm.get('board_id')?.value);
      const task: Task = {
        name: this.boardTaskForm.get('name')?.value,
        deadline: this.boardTaskForm.get('deadline')?.value as Date,
        description: this.boardTaskForm.get('description')?.value,
        board_id: this.boardTaskForm.get('board_id')?.value
      }
      this.taskService.newTask(task).subscribe((response) =>{
        if(response){
          this.boardTaskForm.reset();
          this.closeModal();
          this.loadBoard();
        }
      });
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
