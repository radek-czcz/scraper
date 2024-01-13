import { TestBed } from '@angular/core/testing';

import { SelectedCategoriesService } from './selected-categories.service';

describe('SelectedCategoriesService', () => {
  let service: SelectedCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
