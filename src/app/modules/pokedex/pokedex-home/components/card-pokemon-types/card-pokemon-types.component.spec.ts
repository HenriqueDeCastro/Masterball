import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemonTypesComponent } from './card-pokemon-types.component';

describe('CardPokemonTypesComponent', () => {
  let component: CardPokemonTypesComponent;
  let fixture: ComponentFixture<CardPokemonTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPokemonTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPokemonTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
