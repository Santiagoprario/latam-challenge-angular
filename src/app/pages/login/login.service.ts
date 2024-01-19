import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const body = { email, password };

    return this.http.post(this.apiUrl + '/login', body).pipe(
      map((response: any) => {
        if (response) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userProfile', response.user);
          return response;
        } else {
          return response;
        }
      }),
      catchError(() => of(false))
    );
  }
}