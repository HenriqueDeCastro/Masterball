import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-filter',
  templateUrl: './btn-filter.component.html',
  styleUrls: ['./btn-filter.component.scss']
})
export class BtnFilterComponent {

  @Output() clicked: EventEmitter<Boolean>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  emitClick(): void {
    this.clicked.emit(true);
  }
}
