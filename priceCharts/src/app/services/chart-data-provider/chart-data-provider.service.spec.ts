import { TestBed } from '@angular/core/testing';

import { ChartDataProviderService } from './chart-data-provider.service';

describe('ChartDataProviderService', () => {
  let service: ChartDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
