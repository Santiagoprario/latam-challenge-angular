import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api/users';

  constructor(private http: HttpClient) {}


  logout(): void {
    localStorage.removeItem('token');
  }
}