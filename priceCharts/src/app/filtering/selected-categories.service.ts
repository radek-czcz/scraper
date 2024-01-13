import { Injectable, EventEmitter } from '@angular/core';
import { GetCategoriesService } from '../services/get-categories.service';
import { Observable } from 'rxjs';
import { MatChipListboxChange } from '@angular/material/chips';

@Injectable({
  providedIn: 'root'
})
export class SelectedCategoriesService {

  private selected: string[] = [];
  private reqUrlString: string = '';
  private selectedSub: EventEmitter<MatChipListboxChange> = new EventEmitter<MatChipListboxChange>();

  // Injection of service
    constructor(private categories: GetCategoriesService) { }

  // EventEmitter is assigned in FilteringChipComponent
  // Method to assign EventEmitter - which sends events when selecting categories chips
    public set selectedCategoriesSub(inp: EventEmitter<MatChipListboxChange>) {
      this.selectedSub = inp;
      inp.subscribe(inp2 => {
          console.log('Selected cat. service: ', inp2.value);
          this.categorySelectionChange(inp2);
      });
    }

    public get selectedCategoriesSub(): EventEmitter<MatChipListboxChange> {
      return this.selectedSub;
    }

  /*public categoriesNamesMapObject: Object = {
    'Lodówki': 'Lodówka',
    'Zmywarki': 'Zmywarka',
    "Pendrive'y": 'Pendrive',
    'Klawiatury': 'Klawiatura',
    'Karty pamięci': 'Karta pamięci',
  }*/

  private setSqlCategoriesString(): void {
    let result: string = 'catg=';
    let nth = 0;
    result += this.selected[nth];
    console.dir(this.selected.length, result);
    nth++;
    while (nth < this.selected.length) {
      console.log(result, nth);
      result += ','+this.selected[nth];
      nth++;
    }
    this.reqUrlString = result;
    console.log('result: ',result)
  }

  public get sqlCategoriesString(): string {
    return this.reqUrlString;
  }

  public categorySelectionChange(inp: MatChipListboxChange): void {
    this.selected = inp.value;
    this.setSqlCategoriesString();
  }
}