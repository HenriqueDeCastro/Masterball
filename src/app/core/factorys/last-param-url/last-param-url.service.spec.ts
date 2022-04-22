import { TestBed } from '@angular/core/testing';

import { LastParamUrlService } from './last-param-url.service';

describe('LastParamUrlService', () => {
  let service: LastParamUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastParamUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
