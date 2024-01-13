import { Injectable, EventEmitter } from '@angular/core';
import { MatRadioModule, MatRadioGroup, MatRadioChange } from '@angular/material/radio';
import { MatChipListboxChange } from '@angular/material/chips';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  // private selectedFilters: Array<EventEmitter<MatChipListboxChange | MatRadioChange>> = new Array<EventEmitter<MatChipListboxChange | MatRadioChange>>();
  private selectedFilters: Array<EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>> = 
    new Array<EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>>();

  private reqUrlString: string = '';

  private subscriptions: Subscription[] = [];

  constructor() { console.log('impl') }

  public addFiltersSub(inp: EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange>) {
    this.selectedFilters.push(inp);
    this.subscriptions.push(
      inp.subscribe(inp2 => {
        console.log('Selected fil. service: ', inp2);
        this.filterSelectionChange(inp2);
    }));
  }

  public get selectedFiltersSub(): EventEmitter<MatChipListboxChange> | EventEmitter<MatRadioChange> {
    return this.selectedFilters[0];
  }

  /*public addFiltersSub(): Array<EventEmitter<MatChipListboxChange | MatRadioChange>> {
    return this.selectedFilters;
  }*/

  public filterSelectionChange(inp: MatChipListboxChange | MatRadioChange): void {
    /*this.selectedFilters.push(inp.value);
    console.log('selected: ', this.selectedFilters);*/
    this.setSqlFiltersString(inp);
  }

  private setSqlFiltersString(inp: MatChipListboxChange | MatRadioChange): void {
    let result: string = 'price=';
    result += inp.value;
    this.reqUrlString = result;
  }

  public getSqlFiltersString(): string {
    return this.reqUrlString;
  }
}
