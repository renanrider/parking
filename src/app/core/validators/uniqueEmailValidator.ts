import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function uniqueEmailValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return authService
      .emailAvailable(control.value)
      .pipe(
        map((users: { usernameAlreadyExists: boolean }) =>
          users.usernameAlreadyExists === true
            ? { usernameAlreadyExists: false }
            : null
        )
      );
  };
}
