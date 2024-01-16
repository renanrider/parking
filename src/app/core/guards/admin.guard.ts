import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = () => {
  if (inject(AuthService).isAdmin()) return true;

  inject(Router).navigate(['/access_denied']);
  return false;
};
