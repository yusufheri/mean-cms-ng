import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:4000/auth';
  isAuthentificated = false;

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    this.isAuthentificated = true;
    return this.httpClient.post<User>(`${this.baseUrl}/login`, user);
  }

  logout() {
    this.isAuthentificated = false;
    return this.httpClient.get(`${this.baseUrl}/logout`);
  }

}
