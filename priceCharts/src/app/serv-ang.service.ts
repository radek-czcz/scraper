import { Injectable } from '@angular/core';
import { iProduct } from './products/iProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ServAngService {

  constructor(private http: HttpClient) { }

  public getResponse(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>('http://188.210.222.87:8000/api/all2');
  }

}
