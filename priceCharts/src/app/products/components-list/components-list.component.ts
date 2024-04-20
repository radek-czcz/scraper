import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { MatExpansionModule } from '@angular/material/expansion';
import { ServAngService } from '../../serv-ang.service';
import { Observable } from 'rxjs';
import { iProduct } from '../iProduct'
import { DateFormatterService } from '../../services/date-formatter/date-formatter.service'
import { SelectedCategoriesService } from '../../services/selected-categories/selected-categories.service';
import { SelectedFiltersService } from '../../services/selected-filters/selected-filters.service';

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent  implements OnInit {

  // ARRAY OF LISTED PRODUCTS
    allProductsToShow: iProduct[] = [];

  // DI INJECTIONS
    constructor(
      private servPr: ServAngService, 
      // private dateFormatterService: DateFormatterService,
      private selected: SelectedCategoriesService,
      private selectedFilters: SelectedFiltersService
    ) {}

  // NGONINIT - FIRST RECEIVAL OF ALL PRODUCTS
    ngOnInit(): void {
      this.servPr.getResponse().subscribe(results => {
        this.allProductsToShow = results;
        //console.log(this.allProductsToShow);
        //this.formatDate();
        //this.dateFormatterService.formatDate(this.allProductsToShow);
      })
    }

  // NGAFTERVIEWINIT - SUBSCRIPTIONS TO "SELECTED" SERVICES
    ngAfterViewInit(): void {
      this.selected.selectedCategoriesSub.subscribe(inp => {
        console.log('watching the selected');
        this.servPr.getResponse().subscribe(results => {
        this.allProductsToShow = results;
        })
      })
      this.selectedFilters.selectedFiltersSub.subscribe(inp => {
        console.log('watching the filtered');
        this.servPr.getResponse().subscribe(results => {
        this.allProductsToShow = results;
        })
      })
    }
}
