import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nameOfItemToDeleteValidator(
  nameOfItemToDelete: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (nameOfItemToDelete && value !== nameOfItemToDelete) {
      return { invalidNameOfItemToDelete: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  nameOfItemToDelete = '';
  confirmDialogForm = new FormGroup({
    nameOfItemToDelete: new FormControl('', [
      Validators.required,
      nameOfItemToDeleteValidator(this.data.nameOfItemToDelete),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      if (data.nameOfItemToDelete) {
        this.nameOfItemToDelete = data.nameOfItemToDelete;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.confirmDialogForm.invalid) {
      return;
    }

    this.dialogRef.close({
      deleteResponse: this.confirmDialogForm.valid,
    });
  }
}
