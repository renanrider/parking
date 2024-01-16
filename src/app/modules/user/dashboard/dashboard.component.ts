import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from './dashboard.service';
import { Vehicle } from './interfaces/vehicle.interface';
import * as moment from 'moment';

export interface Parking {
  id: number;
  entryTime: string;
  exitTime: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  name = '';
  showEntryButton: boolean = true;
  vehicle: Vehicle = {
    id: -1,
    brand: '',
    color: '',
    model: '',
    plate: '',
    type: '',
  };

  parkingData: Parking = {
    id: -1,
    entryTime: '',
    exitTime: '',
  };

  control = new FormControl();
  filteredOptions: Observable<Vehicle[]> | undefined;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.initializeUserData();

    this.filteredOptions = this.control.valueChanges.pipe(
      debounceTime(300),
      switchMap((searchTerm) =>
        this.dashboardService.searchVehicles(searchTerm)
      )
    );
  }

  private initializeUserData(): void {
    const user = this.authService.getUser();
    if (user) {
      this.name = user.firstName;
    }
  }

  selectedVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
    this.dashboardService.findParking(vehicle.id).subscribe((parking) => {
      console.log(parking);
      if (parking) {
        this.parkingData.id = parking.id;
        if (parking.entryTime && parking.exitTime) {
          this.parkingData.entryTime = '';
          this.parkingData.exitTime = '';
          this.showEntryButton = true;
        } else if (parking.entryTime) {
          this.parkingData.entryTime = moment(parking.entryTime).format(
            'DD-MM-YYYY HH:mm:ss'
          );
          this.showEntryButton = false;
        } else {
          this.parkingData.entryTime = '';
          this.parkingData.exitTime = '';
        }
      }
    });
  }

  createEntry(vehicle: Vehicle): void {
    this.dashboardService.createEntrance(vehicle.id).subscribe((parking) => {
      this.parkingData.id = parking.id;
      this.showEntryButton = false;
      this.parkingData.entryTime = moment(parking.entryTime).format(
        'DD-MM-YYYY HH:mm:ss'
      );
    });
  }

  createExit(id: number): void {
    this.dashboardService.updateExit(id).subscribe((parking) => {
      console.log(parking);
      this.showEntryButton = true;
      this.parkingData.exitTime = moment(parking.exitTime).format(
        'DD-MM-YYYY HH:mm:ss'
      );
    });
  }
}
