import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Output() closeDrawer = new EventEmitter<void>();
  @Input() showDrawer?: boolean;

  close() {
    this.closeDrawer.emit();
  }
}
