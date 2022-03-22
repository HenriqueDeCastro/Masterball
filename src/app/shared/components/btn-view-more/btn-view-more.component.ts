import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-view-more',
  templateUrl: './btn-view-more.component.html',
  styleUrls: ['./btn-view-more.component.scss']
})
export class BtnViewMoreComponent {

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  clickedEmit(): void {
    this.clicked.emit(true);
  }
}
