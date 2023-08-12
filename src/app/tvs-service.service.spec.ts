import { TestBed } from '@angular/core/testing';

import { TvsServiceService } from './tvs-service.service';

describe('TvsServiceService', () => {
  let service: TvsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
