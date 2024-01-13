import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { DOMAIN_PORT_TOKEN } from './connections/connections.config';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  private urlApiEnd: string = '/api/prices/categories';

  constructor(private http: HttpClient, @Inject(DOMAIN_PORT_TOKEN) private domPor: string) { }

  public getResponse(): Observable<any[]> {
    return this.http.get<any[]>(this.domPor + this.urlApiEnd);
  }
}