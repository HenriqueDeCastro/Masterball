import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent {

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();

  eventLink(): void {
    this.closeMenu.emit(true);
  }
}
