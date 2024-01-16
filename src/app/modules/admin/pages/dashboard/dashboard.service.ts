import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getActiveStudentsCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/users/active-students`);
  }

  getTemporaryStudentsCount(): Observable<number> {
    return this.http.get<number>(
      `${environment.apiUrl}/users/temporary-students`
    );
  }

  getUnitsCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/unit/count`);
  }
}
