import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  isSideNavCollapsed = true;
  isTopNavCollapsed = true;
  signIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.signIn$.subscribe((signIn: boolean) => {
      this.signIn = signIn;
    });
  }

  toggleSideNav() {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }

  toggleTopNav() {
    this.isTopNavCollapsed = !this.isTopNavCollapsed;
  }
}
