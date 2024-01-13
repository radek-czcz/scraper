import { iProduct } from '../../products/iProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { ApiUrlsService } from '../connections/api-urls.service'

@Injectable({
  providedIn: 'root'
})
export class ChartDataProvider2Service {

  private _prName: string = '';

  private data: [] = []

  constructor(private http: HttpClient, private urlApi: ApiUrlsService) {}

  // CHECK IF ID COULD NOT BE PASSED ANOTHER WAY
  public getChartData(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(/*'http://188.210.222.87:8000/api/prices/' 'http://localhost:8000/api/prices/'*/ this.urlApi.getApiUrl() + this._prName);
  }

  public set prName(inp: string) {
    this._prName = inp;
    //this._prName = inp;
  }

  public get prName(): string {
    return this._prName;
  }

}