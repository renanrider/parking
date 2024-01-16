import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Output() toggleTopNav: EventEmitter<boolean> = new EventEmitter();
  collapsed = true;
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

  toggleBottomSheetCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleTopNav.emit(this.collapsed);
  }
}
