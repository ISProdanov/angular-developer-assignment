import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './user';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL of the development API
  private apiUrl = 'http://localhost:3000';

  users: User[];

  constructor(
    private http: HttpClient,
    ) { }
    
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  createUser(user: User) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }
}
