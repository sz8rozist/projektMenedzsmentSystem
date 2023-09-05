import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProjektFileComponent } from './projekt-file/projekt-file.component';
import { UploadFIleComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'board/:id', component: BoardComponent, canActivate:[AuthGuard]},
  {path: 'message-board', component: MessageBoardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'files/:id', component: ProjektFileComponent, canActivate:[AuthGuard]},
  {path: 'uploadFile', component: UploadFIleComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
