import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPokemonComponent } from './filters-pokemon.component';

describe('FiltersPokemonComponent', () => {
  let component: FiltersPokemonComponent;
  let fixture: ComponentFixture<FiltersPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
