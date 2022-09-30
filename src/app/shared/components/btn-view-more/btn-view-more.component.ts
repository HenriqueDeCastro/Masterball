import { Component, Input, Output, EventEmitter } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/factorys/loading/loading.service';

@Component({
  selector: 'app-btn-view-more',
  templateUrl: './btn-view-more.component.html',
  styleUrls: ['./btn-view-more.component.scss']
})
export class BtnViewMoreComponent {

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.get().pipe(delay(0));
  }

  clickedEmit(): void {
    this.clicked.emit(true);
  }
}
