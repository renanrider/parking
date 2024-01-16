import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notloggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) return true;
  if (authService.isAdmin()) router.navigate(['/admin/dashboard']);
  if (authService.isUser()) router.navigate(['/user/dashboard']);

  return false;
};
