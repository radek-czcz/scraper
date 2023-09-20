import { iProduct } from '../../products/iProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataProviderService {

  private _prName: string = '';

  private data: [] = []

  constructor(private http: HttpClient) {}

// CHECK IF ID COULD NOT BE PASSED ANOTHER WAY
  public getChartData(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>('http://188.210.222.87:8000/api/prices/' + this._prName);
  }

  public set prName(inp: string) {
    this._prName = inp;
  }

  public get prName(): string {
    return this._prName;
  }

}

/*{
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
}
*/
