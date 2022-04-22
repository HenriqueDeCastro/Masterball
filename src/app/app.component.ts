import { Observable, delay } from 'rxjs';
import { Component } from '@angular/core';
import { LoadingService } from './core/factorys/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  openMenu!: boolean;
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.getLoading().pipe(delay(0));
  }

  receiveMenu(openMenu: boolean): void {
    this.openMenu = openMenu;
  }

  receiveCloseMenu(closeMenu: boolean): void {
    this.openMenu = !closeMenu;
  }
}
