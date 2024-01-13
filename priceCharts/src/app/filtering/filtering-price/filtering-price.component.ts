import { Component, ViewChild } from '@angular/core';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { SelectedFiltersService } from '../selected-filters.service';

@Component({
  selector: 'app-filtering-price',
  templateUrl: './filtering-price.component.html',
  styleUrls: ['./filtering-price.component.css'],
})
export class FilteringPriceComponent {

  @ViewChild( MatRadioGroup, {read: MatRadioGroup} ) private group!: MatRadioGroup;

  // Default filter value, which is being changed by clicking on radio button
    private priceMultFactor: number = 1.1;

  // Injection
    constructor(private selectedFilters: SelectedFiltersService) {}

  // CONNECTION MatRadioGroup - SelectedFiltersService
    ngAfterViewInit() {
      this.selectedFilters.addFiltersSub(this.group.change);
    }
}
