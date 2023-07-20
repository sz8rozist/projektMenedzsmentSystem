import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Board } from 'src/app/model/Board';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() boards?: Board[];
  @Input() showModal?: boolean;

  close() {
    this.closeModal.emit();
  }
}
