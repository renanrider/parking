import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Establishment } from './interfaces/establishment.interface';
import { Vehicle } from './interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private http: HttpClient) {}

  getAllEstablishments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/establishments`);
  }

  createEstablishment(establishment: Establishment): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/establishments`,
      establishment
    );
  }

  Establishment(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/establishments/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${environment.apiUrl}/vehicles`, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    console.log(vehicle);
    return this.http.patch(
      `${environment.apiUrl}/vehicles/${vehicle.id}`,
      vehicle
    );
  }

  updateEstablishment(
    id: string,
    establishment: Establishment
  ): Observable<any> {
    return this.http.patch(
      `${environment.apiUrl}/establishments/${id}`,
      establishment
    );
  }

  getAllFlashCards(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/vehicles/establishment/${id}`
    );
  }

  removeFlashCard(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/flash-cards-deck/flash-cards/${id}`
    );
  }
}
