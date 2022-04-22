import { TestBed } from '@angular/core/testing';

import { GetRegionsResolver } from './get-regions.resolver';

describe('GetRegionsResolver', () => {
  let resolver: GetRegionsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetRegionsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
