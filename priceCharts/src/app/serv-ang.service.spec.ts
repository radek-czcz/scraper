import { TestBed } from '@angular/core/testing';

import { ServAngService } from './serv-ang.service';

describe('ServAngService', () => {
  let service: ServAngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServAngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
