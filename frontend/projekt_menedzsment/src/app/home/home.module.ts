import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BoardComponent } from './board/board.component';
import { ProjektListComponent } from './projekt-list/projekt-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ProfileComponent } from './profile/profile.component';
import { DrawerComponent } from '../shared/drawer/drawer.component';
import { AlertComponent } from '../shared/alert/alert.component';
import { IncrementPipe } from '../pipe/increment.pipe';
import { ProjektFileComponent } from './projekt-file/projekt-file.component';
import { SpeedDialComponent } from '../shared/speed-dial/speed-dial.component';
import { UploadFIleComponent } from './upload-file/upload-file.component';
@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    ProjektListComponent,
    ModalComponent,
    MessageBoardComponent,
    MessageListComponent,
    ProfileComponent,
    DrawerComponent,
    AlertComponent,
    IncrementPipe,
    ProjektFileComponent,
    SpeedDialComponent,
    UploadFIleComponent
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
