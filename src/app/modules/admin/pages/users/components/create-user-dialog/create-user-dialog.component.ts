import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { uniqueEmailValidator } from '../../../../../../core/validators/uniqueEmailValidator';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent {
  dialogTitle = '';
  isEdit = false;
  userCreateForm: FormGroup = {} as FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private authService: AuthService
  ) {
    this.initializeForm();
    this.initializeFormValues();
  }

  private initializeForm() {
    this.userCreateForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        [uniqueEmailValidator(this.authService)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
      ]),
    });

    if (this.data && this.data.id !== undefined) {
      this.isEdit = true;
      this.userCreateForm.removeControl('email');
      this.userCreateForm.removeControl('password');
    }
  }

  private initializeFormValues() {
    if (this.data) {
      const { dialogTitle, firstName, lastName, email, password } = this.data;

      if (dialogTitle) {
        this.dialogTitle = dialogTitle;
      }

      if (firstName) {
        this.userCreateForm.patchValue({ firstName });
      }

      if (lastName) {
        this.userCreateForm.patchValue({ lastName });
      }

      if (email) {
        this.userCreateForm.patchValue({ email });
      }

      if (password) {
        this.userCreateForm.patchValue({ password });
      }
    }
  }

  onSubmit() {
    if (this.userCreateForm.invalid) {
      return;
    }

    const { firstName, lastName, email, password } = this.userCreateForm.value;

    this.dialogRef.close({ firstName, lastName, email, password });
  }

  onReset() {
    this.userCreateForm.reset();
  }
}
