import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(
    nameOfItemToDelete: string
  ): Observable<{ deleteResponse: boolean }> {
    const dialogRef = this.dialog
      .open(ConfirmDialogComponent, {
        width: '600px',
        data: {
          nameOfItemToDelete,
        },
      })
      .afterClosed();

    return dialogRef;
  }
}
