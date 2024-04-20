import { Component, ViewChild } from '@angular/core';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { SelectedFiltersService } from '../../services/selected-filters/selected-filters.service';
import { RouterModule, Router } from '@angular/router'

@Component({
  selector: 'app-filtering-price',
  templateUrl: './filtering-price.component.html',
  styleUrls: ['./filtering-price.component.css'],
})
export class FilteringPriceComponent {

  @ViewChild( MatRadioGroup, {read: MatRadioGroup} ) private group!: MatRadioGroup;

  // DEFAULT FILTER VALUE, WHICH IS BEING CHANGED BY CLICKING ON RADIO BUTTON
    private priceMultFactor: number = 1.1;

  // INJECTION
    constructor(private selectedFilters: SelectedFiltersService, private router: Router) {}

  // CONNECTION MATRADIOGROUP - SELECTEDFILTERSSERVICE
    ngAfterViewInit() {
      this.selectedFilters.addFiltersSub(this.group.change);
    }

    nav() {
      this.router.navigate(['/', 'cv']);
    }
}
