import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringPriceComponent } from './filtering-price.component';

describe('FilteringPriceComponent', () => {
  let component: FilteringPriceComponent;
  let fixture: ComponentFixture<FilteringPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
