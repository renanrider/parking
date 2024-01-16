import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  Credentials,
} from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  isLoading = false;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(60),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    if (this.signinForm.invalid) return;

    this.isLoading = true;
    this.authService.signin(this.signinForm.value as Credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([
          this.authService.isAdmin() ? '/admin/dashboard' : '/user/dashboard',
        ]);
        this.snackbarService.showSnackbar(
          'Sucesso!',
          'Bem-vindo, Novamente!',
          3000
        );
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage =
          error.error.statusCode === HttpStatusCode.BadRequest
            ? 'Verifique seu e-mail e senha e tente novamente.'
            : '';
        this.snackbarService.showSnackbar('Erro!', errorMessage, 3000);
        this.isLoading = false;
      },
    });
  }
}
