import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-view-more',
  templateUrl: './btn-view-more.component.html',
  styleUrls: ['./btn-view-more.component.scss']
})
export class BtnViewMoreComponent {

  @Input() loading: boolean = true;
}
