import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: `
    <span>{{ data.message }}</span>
    <button mat-icon-button class="close" (click)="dismiss()">
      <mat-icon>close</mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
      }
      .close {
        margin-left: auto;
        margin-right: 5px;
      }
    `,
  ],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {}

  dismiss() {
    // Dismiss the snackbar
  }
}
