import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  constructor(
    private matBottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private authService: AuthService
  ) {}

  signOut() {
    this.matBottomSheetRef.dismiss();
    this.authService.logout();
  }
}
