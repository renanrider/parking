import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  enableBackButtom = false;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.enableBackButtom$.subscribe((enableBackButtom) => {
      this.enableBackButtom = enableBackButtom;
    });
  }

  back() {
    this.navigationService.back();
  }
}
