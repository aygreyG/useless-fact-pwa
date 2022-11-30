import { TestBed } from '@angular/core/testing';

import { FactApiService } from './fact-api.service';

describe('FactApiService', () => {
  let service: FactApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
