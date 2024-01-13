import { Injectable, Inject } from '@angular/core';
import { DOMAIN_PORT_TOKEN } from './connections.config';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor(@Inject(DOMAIN_PORT_TOKEN) private domPor: string/*DomainPortService*/) { }

  private urlApi: string = '/api/prices/';

  public getApiUrl() {
    return this.domPor + this.urlApi;
  }
}