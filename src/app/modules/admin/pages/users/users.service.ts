import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/users/${user.id}`, user);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/users/`);
  }

  removeFlashCard(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
}
