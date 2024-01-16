import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  name: string | undefined;
  activeStudents = 0;
  temporaryStudents = 0;
  units = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadUserData();
    this.loadData();
  }

  private loadUserData() {
    const user = localStorage.getItem('user') || '';
    this.name = JSON.parse(user).firstName;
  }

  private loadData() {
    this.loadActiveStudentsCount();
    this.loadTemporaryStudentsCount();
    this.loadUnitsCount();
  }

  private loadActiveStudentsCount() {
    this.dashboardService.getActiveStudentsCount().subscribe((result) => {
      this.activeStudents = result;
    });
  }

  private loadTemporaryStudentsCount() {
    this.dashboardService.getTemporaryStudentsCount().subscribe((result) => {
      this.temporaryStudents = result;
    });
  }

  private loadUnitsCount() {
    this.dashboardService.getUnitsCount().subscribe((result) => {
      this.units = result;
    });
  }
}
