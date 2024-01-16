import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { EntryExitData } from './interfaces/entry-exit-data.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  name: string | undefined;
  data: EntryExitData | undefined;
  displayedColumns: string[] = ['id', 'entryTime', 'exitTime'];
  dataSource: EntryExitData[] = [];

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
    this.loadEntryExit();
  }

  private loadEntryExit() {
    this.dashboardService.loadEntryExit().subscribe((entryExitData) => {
      this.dataSource = entryExitData;
    });
  }
}
