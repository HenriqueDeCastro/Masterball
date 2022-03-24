import { TestBed } from '@angular/core/testing';

import { GetPokemonsResolver } from './get-pokemons.resolver';

describe('GetPokemonsResolver', () => {
  let resolver: GetPokemonsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetPokemonsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
