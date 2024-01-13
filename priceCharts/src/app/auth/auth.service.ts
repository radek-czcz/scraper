import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any = '';
  constructor(private http: HttpClient) { }

  login(): Observable<string> {
    return this.http.post<string>('http://localhost:8000/register', {
      iduser: 'david_r',
    }).pipe(tap(token => {
      console.log(token);
      this.token = token;
    }));
  }

  logout(): void {
    this.token = '';
  }

  get isLoggedIn() { 
    return this.token !== ''; }
}
