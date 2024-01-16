import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const UserGuard: CanActivateFn = () => {
  if (inject(AuthService).isUser()) return true;

  inject(Router).navigate(['/access_denied']);
  return false;
};
