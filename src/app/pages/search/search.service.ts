import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  searchId(id: string ): Observable<any> {
    return this.http.get(this.apiUrl + `/associates/${id}`).pipe(
      map((response: any) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }
}