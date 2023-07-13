import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {

  @Input() username?: string;
  @Output() logoutEvent = new EventEmitter();

  onLogout(){
    this.logoutEvent.emit();
  }
}
