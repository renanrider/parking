import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { EntryExitData } from './interfaces/entry-exit-data.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  loadEntryExit(): Observable<EntryExitData[]> {
    return this.http.get<EntryExitData[]>(
      `${environment.apiUrl}/parking-flow-control?order=ASC`
    );
  }
}
