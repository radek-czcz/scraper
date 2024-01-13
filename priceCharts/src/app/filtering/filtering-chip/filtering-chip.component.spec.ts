import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringChipComponent } from './filtering-chip.component';

describe('FilteringChipComponent', () => {
  let component: FilteringChipComponent;
  let fixture: ComponentFixture<FilteringChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteringChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
