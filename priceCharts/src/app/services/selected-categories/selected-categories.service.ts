import { Injectable, EventEmitter } from '@angular/core';
import { GetCategoriesService } from '../get-categories/get-categories.service';
import { Observable } from 'rxjs';
import { MatChipListboxChange } from '@angular/material/chips';


/*
  THIS SERVICE MAINTAINS THE WORKING OF PRODUCT CATEGORY CHIPS' SELECTION.
  HERE IS BEING PREPARED THE STRING, THE PART OF THE DB'S REQUEST URL, WHICH DESCRIBES SELECTED CATEGORIES CHIPS.
  CLASS ALSO HOLDS CHIPS EVENTEMITTER. */
@Injectable({
  providedIn: 'root'
})
export class SelectedCategoriesService {

  // ARRAY OF CURRENTLY SELECTED CATEGORIES
    private selected: string[] = [];
  // CURRENT REQUEST'S STRING
    private reqUrlString: string = '';
  // VARIABLE HOLDING CHIP'S EVENTEMITTER
    private selectedSub: EventEmitter<MatChipListboxChange> = new EventEmitter<MatChipListboxChange>();

  // CONSTRUCTOR INJECTION
    constructor(private categories: GetCategoriesService) { }

  // EVENTEMITTER IS ASSIGNED IN FILTERINGCHIPCOMPONENT
  // METHOD TO ASSIGN EVENTEMITTER - WHICH SENDS EVENTS WHEN SELECTING CATEGORIES CHIPS
    public set selectedCategoriesSub(inp: EventEmitter<MatChipListboxChange>) {
      this.selectedSub = inp;
      inp.subscribe(inp2 => {
          console.log('Selected cat. service: ', inp2.value);
          this.categorySelectionChange(inp2);
      });
    }

  // GETTER FOR CHIPS' COMPONENT EVENT EMMITER
    public get selectedCategoriesSub(): EventEmitter<MatChipListboxChange> {
      return this.selectedSub;
    }

  // COMPILE REQUEST STRING, WHEN SELECTION CHANGES
    private compileSqlCategoriesString(): void {
      let result: string = 'catg=';
      let nth = 0;
      result += this.selected[nth];
      console.dir(this.selected.length, result);
      nth++;
      while (nth < this.selected.length) {
        console.log(result, nth);
        result += ','+this.selected[nth];
        nth++;
      };
      this.reqUrlString = result;
      console.log('result: ',result);
    }

  // GETTER FOR REQUEST STRING
    public get sqlCategoriesString(): string {
      return this.reqUrlString;
    }

  // METHOD EXECUTED WHEN SELECTION CHANGES
    public categorySelectionChange(inp: MatChipListboxChange): void {
      this.selected = inp.value;
      this.compileSqlCategoriesString();
    }
}