import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() menu: EventEmitter<boolean> = new EventEmitter();

  eventMenu(): void {
    this.menu.emit(true);
  }
}
