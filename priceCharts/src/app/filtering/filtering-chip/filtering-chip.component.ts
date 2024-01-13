import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatChipListboxChange, MatChipListbox } from '@angular/material/chips';
import { GetCategoriesService } from '../../services/get-categories.service';
import { SelectedCategoriesService } from '../selected-categories.service';

@Component({
  selector: 'app-filtering-chip',
  templateUrl: './filtering-chip.component.html',
  styleUrls: ['./filtering-chip.component.css'],
})
export class FilteringChipComponent {

  @ViewChild(MatChipListbox, { read: MatChipListbox }) private listbox!: MatChipListbox;

  // Categories which are read from database
    prCategories: string[] = [];

  // Injection
    constructor(private categories: GetCategoriesService, private selectedCategories: SelectedCategoriesService) {}

  // Get Categories from database
    ngOnInit(): void {
      this.categories.getResponse().subscribe(results => {
          this.prCategories = results.map(inp => {
            if (inp.prCategory !== '')
              return inp.prCategory
              }).filter(inp => inp !== undefined);
        }
      )
    }

  // CONNECTION MatChipListBox - SelectedCategoriesService
    ngAfterViewInit() {
      this.selectedCategories.selectedCategoriesSub = this.listbox.change;
    }
}