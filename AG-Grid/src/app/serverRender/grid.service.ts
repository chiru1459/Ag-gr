import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class GridService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(params: HttpParams): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, { params });
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${user.id}`, user);
  }
}
