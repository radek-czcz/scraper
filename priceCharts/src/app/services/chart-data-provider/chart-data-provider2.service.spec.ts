import { TestBed } from '@angular/core/testing';

import { ChartDataProvider2Service } from './chart-data-provider2.service';

describe('ChartDataProvider2Service', () => {
  let service: ChartDataProvider2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDataProvider2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
