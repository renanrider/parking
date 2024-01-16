import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-vehicle-dialog',
  templateUrl: './create-vehicle-dialog.component.html',
  styleUrls: ['./create-vehicle-dialog.component.scss'],
})
export class CreateVehicleDialogComponent {
  dialogTitle = '';

  vehicleCreateForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    plate: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateVehicleDialogComponent>
  ) {
    if (data) {
      if (this.data.dialogTitle) {
        this.dialogTitle = this.data.dialogTitle;
      }
      if (this.data.brand) {
        this.vehicleCreateForm.patchValue({
          brand: this.data.brand,
        });
      }

      if (this.data.model) {
        this.vehicleCreateForm.patchValue({
          model: this.data.model,
        });
      }

      if (this.data.color) {
        this.vehicleCreateForm.patchValue({
          color: this.data.color,
        });
      }

      if (this.data.type) {
        this.vehicleCreateForm.patchValue({
          type: this.data.type,
        });
      }
      if (this.data.plate) {
        this.vehicleCreateForm.patchValue({
          plate: this.data.plate,
        });
      }
    }
  }

  onSubmit() {
    if (this.vehicleCreateForm.invalid) {
      return;
    }

    this.dialogRef.close({
      brand: this.vehicleCreateForm.get('brand')?.value,
      model: this.vehicleCreateForm.get('model')?.value,
      color: this.vehicleCreateForm.get('color')?.value,
      type: this.vehicleCreateForm.get('type')?.value,
      plate: this.vehicleCreateForm.get('plate')?.value,
    });
  }

  onReset() {
    this.vehicleCreateForm.reset();
  }
}
