import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BoardComponent } from './board/board.component';
import { ProjektListComponent } from './projekt-list/projekt-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    ProjektListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DragDropModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
