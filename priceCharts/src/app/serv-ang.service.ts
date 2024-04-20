import { Injectable, Inject, OnInit } from '@angular/core';
import { iProduct } from './products/iProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
//import { ApiUrlsService } from './services/connections/api-urls.service'
import { DOMAIN_PORT_TOKEN } from './services/connections/connections.config';
import { SelectedCategoriesService } from './services/selected-categories/selected-categories.service';
import { SelectedFiltersService } from './services/selected-filters/selected-filters.service';

@Injectable({
  providedIn: 'root'
})
export class ServAngService {

  private urlApiEnd: string = '/api/all2';
  private selection: string[] = [];

  constructor(
    private http: HttpClient, 
    @Inject(DOMAIN_PORT_TOKEN) private domPor: string,
    private selected: SelectedCategoriesService,
    private selectedFilters: SelectedFiltersService
  ) { }

  // send request to backend server
    public getResponse(): Observable<iProduct[]> {
      let url: string;
      url = this.domPor + this.urlApiEnd + '?';
      this.selected.sqlCategoriesString ? 
        url = this.domPor + this.urlApiEnd + '?' + this.selected.sqlCategoriesString : null;
        // url = this.domPor + this.urlApiEnd + this.selected.sqlCategoriesString
      this.selectedFilters.getSqlFiltersString() ? url += '&' + this.selectedFilters.getSqlFiltersString() : null;
      console.log('serv.ang URL: ', url);
      return this.http.get<iProduct[]>(url);
    }
}
