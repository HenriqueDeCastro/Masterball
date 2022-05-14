import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss'],
  animations: [
    trigger('slideInImage',
      [
        state('*', style({ 'overflow-y': 'hidden' })),
        state('void', style({ 'overflow-y': 'hidden' })),
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out', style({ height: 150, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 150, opacity: 1 }),
            animate('0.3s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0,  }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ]
    )
  ]
})
export class LateralMenuComponent implements OnDestroy {

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();
  showMenuDesktop!: boolean;
  private breakpointSubscription$: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription$ = this.breakpointObserver.observe(["(max-width: 950px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.showMenuDesktop = true;
        } else {
          this.showMenuDesktop = false;
        }
    });
  }

  eventLink(): void {
    this.closeMenu.emit(true);
  }

  closeOrOpenMenu(value: boolean): void {
    this.showMenuDesktop = value;
  }

  ngOnDestroy(): void {
    if(this.breakpointSubscription$) {
      this.breakpointSubscription$.unsubscribe();
    }
  }
}
