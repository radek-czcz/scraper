import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServAngService } from '../../serv-ang.service';
import { Observable } from 'rxjs';
import { iProduct } from '../iProduct'
import { DateFormatterService } from '../../services/date-formatter/date-formatter.service'
import { SelectedCategoriesService } from '../../filtering/selected-categories.service';
import { SelectedFiltersService } from '../../filtering/selected-filters.service';

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent  implements OnInit {

  // Array of listed products
    allProductsToShow: iProduct[] = [];
  subSelected: string[] = [];

  // DI injections
    constructor(
      private servPr: ServAngService, 
      private dateFormatterService: DateFormatterService,
      private selected: SelectedCategoriesService,
      private selectedFilters: SelectedFiltersService
    ) {}

  // ngOnInit - first receival of all products
    ngOnInit(): void {
      this.servPr.getResponse().subscribe(results => {
        this.allProductsToShow = results;
        //console.log(this.allProductsToShow);
        //this.formatDate();
        //this.dateFormatterService.formatDate(this.allProductsToShow);
      })
    }

  // ngAfterViewInit - fake-subscribe to 'selected' and sub to get selected products
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
