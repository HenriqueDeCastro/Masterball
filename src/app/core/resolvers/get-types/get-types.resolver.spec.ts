import { TestBed } from '@angular/core/testing';

import { GetTypesResolver } from './get-types.resolver';

describe('GetTypesResolver', () => {
  let resolver: GetTypesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetTypesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
