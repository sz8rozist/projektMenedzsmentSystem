import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BoardComponent } from './board/board.component';
import { ProjektListComponent } from './projekt-list/projekt-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ProfileComponent } from './profile/profile.component';
import { DrawerComponent } from '../shared/drawer/drawer.component';
@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    ProjektListComponent,
    SidebarComponent,
    ModalComponent,
    MessageBoardComponent,
    MessageListComponent,
    ProfileComponent,
    DrawerComponent
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
