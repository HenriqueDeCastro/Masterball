import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFilterFromTypeComponent } from './btn-filter-from-type.component';

describe('BtnFilterFromTypeComponent', () => {
  let component: BtnFilterFromTypeComponent;
  let fixture: ComponentFixture<BtnFilterFromTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFilterFromTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnFilterFromTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
