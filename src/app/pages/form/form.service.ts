import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface IAssociate {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  age?: string | null;
  isAssociated?: boolean | null;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  requestForm(form: IAssociate): Observable<boolean> {
    const body = { ...form };

    return this.http.post(this.apiUrl + '/associates', body).pipe(
      map((response: any) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }
}