import { Injectable, EventEmitter } from '@angular/core';
import { MatRadioModule, MatRadioGroup, MatRadioChange } from '@angular/material/radio';
import { MatChipListboxChange } from '@angular/material/chips';
import { Subscription } from 'rxjs';

/*
  THIS CLASS MAINTAINS WORKING OF PRICE DISCOUNTS' RADIO BUTTONS
  HERE IS BEING PREPARED THE STRING, THE PART OF THE DB'S REQUEST URL, WHICH DESCRIBES SELECTED PRICE DISCOUNT.
  CLASS ALSO HOLDS RADIO BUTTON EVENTEMITTER.
  RECONSIDER WHY THERE ARE ARRAYS OF TWO TYPES OF EVENTEMITTERS, BUT ONLY RADIO COMPONENT IS BEING HANDLED IN THIS CLASS */
@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  // VARIABLE HOLDING RADIO'S EVENTEMITTER
    private selectedFilters: Array<EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>> = 
      new Array<EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>>();

  // CURRENT REQUEST'S STRING
    private reqUrlString: string = '';

  // SUBSCRIPTIONS' ARRAY
    private subscriptions: Subscription[] = [];

  // PUBLIC METHOD ADDING RADIO'S EVENTEMITTER BEING HANDLED. CREATE SUBSCRIPTION FOR EVENTEMITTER.
    public addFiltersSub(inp: EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>) {
      this.selectedFilters.push(inp);
      this.subscriptions.push(
        inp.subscribe(inp2 => {
          console.log('Selected fil. service: ', inp2);
          this.filterSelectionChange(inp2);
      }));
    }

  // GETTER FOR RADIO'S EVENTEMITTER
    public get selectedFiltersSub(): EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange> {
      return this.selectedFilters[0];
    }

  // METHOD EXECUTED WHEN FILTER CHANGES
    public filterSelectionChange(inp: MatChipListboxChange | MatRadioChange): void {
      this.setSqlFiltersString(inp);
    }

  // COMPILE REQUEST STRING, WHEN SELECTION CHANGES
    private setSqlFiltersString(inp: MatChipListboxChange | MatRadioChange): void {
      let result: string = 'price=';
      result += inp.value;
      this.reqUrlString = result;
    }

  // GETTER FOR REQUEST STRING
    public getSqlFiltersString(): string {
      return this.reqUrlString;
    }
}
