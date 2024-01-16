import { UserRole } from './userRole';

export const sidenavItens = [
  {
    routerLink: 'dashboard',
    icon: 'fa-solid fa-house',
    label: 'Início',
    permission: [UserRole.ADMIN, UserRole.USER],
  },
  {
    routerLink: 'establishment',
    icon: 'fa-solid fa-building',
    label: 'Estabelecimentos',
    permission: [UserRole.ADMIN],
  },
  {
    routerLink: 'users',
    icon: 'fa-solid fa-user',
    label: 'Usuários',
    permission: [UserRole.ADMIN],
  },
];
