import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsTypesComponent } from './icons-types.component';

describe('IconsTypesComponent', () => {
  let component: IconsTypesComponent;
  let fixture: ComponentFixture<IconsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
