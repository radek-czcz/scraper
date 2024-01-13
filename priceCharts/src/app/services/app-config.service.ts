import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app-config'

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  data: AppConfig = {}

  constructor(private http: HttpClient) { }

  load(defaults?: AppConfig): Promise<AppConfig> {
    return new Promise<AppConfig>(resolve => {
      this.http.get('./app.config-r.json').subscribe(res => {
        console.log('using server-side configuration');
        this.data = Object.assign({}, defaults || {}, res || {});
        resolve(this.data);
      }, 
        (err) => {
          console.log(err);
          console.log('using default configuration');
          this.data = Object.assign({}, defaults || {});
          resolve(this.data);
        }
      )
    })
  }
}

