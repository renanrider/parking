import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { sidenavItens } from './sidenav-itens';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter();
  collapsed = true;
  navData: {
    routerLink: string;
    icon: string;
    label: string;
    permission: number[];
  }[] = [];

  constructor(private authService: AuthService) {
    this.navData = sidenavItens.filter((path) => {
      const user = authService.getUser();
      return user != null && path.permission.includes(parseInt(user.role));
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.toggleSideNav.emit(this.collapsed);
  }

  signOut() {
    this.authService.logout();
  }
}
