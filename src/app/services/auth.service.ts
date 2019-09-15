import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:4000/auth/login';

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post<User>(this.baseUrl, user);
  }
}
