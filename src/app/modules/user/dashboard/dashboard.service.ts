import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Vehicle } from './interfaces/vehicle.interface';
import { Parking } from './dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  searchVehicles(plate: string): Observable<Vehicle[]> {
    const url = `${environment.apiUrl}/vehicles?search=${plate}`;
    return this.http.get<Vehicle[]>(url);
  }

  findParking(id: number): Observable<Parking> {
    const url = `${environment.apiUrl}/parking-flow-control/${id}`;
    return this.http.get<Parking>(url);
  }

  createEntrance(id: number): Observable<Parking> {
    const url = `${environment.apiUrl}/parking-flow-control/`;
    return this.http.post<Parking>(url, {
      vehicleId: id,
    });
  }

  updateExit(id: number): Observable<Parking> {
    const url = `${environment.apiUrl}/parking-flow-control/${id}`;
    return this.http.patch<Parking>(url, {});
  }
}
