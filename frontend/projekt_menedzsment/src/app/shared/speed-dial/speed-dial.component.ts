import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.css']
})
export class SpeedDialComponent {
  @Input() isHovered: boolean = false;
  @Output() mouseEnterEvent = new EventEmitter<void>();
  @Output() mouseLeaveEvent = new EventEmitter<void>();

  onMouseEnter() {
    this.mouseEnterEvent.emit();
  }

  onMouseLeave() {
    this.mouseLeaveEvent.emit();
  }
}
