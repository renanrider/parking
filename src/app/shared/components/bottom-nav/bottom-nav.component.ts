import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '../../../core/services/auth.service';
import { sidenavItens } from '../sidenav/sidenav-itens';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnChanges {
  @Input() toggleTopNav = true;
  navData: {
    routerLink: string;
    icon: string;
    label: string;
    permission: number[];
  }[] = [];

  constructor(
    private authService: AuthService,
    private matBottomSheet: MatBottomSheet
  ) {
    this.navData = sidenavItens.filter((path) => {
      const user = authService.getUser();
      return user != null && path.permission.includes(parseInt(user.role));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousValue = JSON.stringify(changes['toggleTopNav'].previousValue);

    if (previousValue) {
      this.openBottomSheet();
    }
  }

  openBottomSheet(): void {
    this.matBottomSheet.open(BottomSheetComponent);
  }

  signOut() {
    this.authService.logout();
  }
}
