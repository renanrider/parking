import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-establishment-dialog',
  templateUrl: './create-establishment-dialog.component.html',
  styleUrls: ['./create-establishment-dialog.component.scss'],
})
export class CreateEstablishmentDialogComponent {
  dialogTitle = '';

  createCardDialogForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    amountyCar: new FormControl('', [Validators.required]),
    amountyMotorcycle: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateEstablishmentDialogComponent>
  ) {
    if (data) {
      if (data.name) {
        this.createCardDialogForm.patchValue({ name: data.name });
      }
      if (data.cnpj) {
        this.createCardDialogForm.patchValue({ cnpj: data.cnpj });
      }

      if (data.address) {
        this.createCardDialogForm.patchValue({ address: data.address });
      }
      if (data.phone) {
        this.createCardDialogForm.patchValue({ phone: data.phone });
      }

      if (data.amountyMotorcycle) {
        this.createCardDialogForm.patchValue({
          amountyMotorcycle: data.amountyMotorcycle,
        });
      }
      if (data.amountyCar) {
        this.createCardDialogForm.patchValue({
          amountyCar: data.amountyCar,
        });
      }
    }
  }

  onSubmit() {
    if (this.createCardDialogForm.invalid) {
      return;
    }

    this.dialogRef.close({
      name: this.createCardDialogForm.get('name')?.value,
      cnpj: this.createCardDialogForm.get('cnpj')?.value,
      address: this.createCardDialogForm.get('address')?.value,
      phone: this.createCardDialogForm.get('phone')?.value,
      amountyCar: this.createCardDialogForm.get('amountyCar')?.value,
      amountyMotorcycle:
        this.createCardDialogForm.get('amountyMotorcycle')?.value,
    });
  }

  onReset() {
    this.createCardDialogForm.reset();
  }
}
