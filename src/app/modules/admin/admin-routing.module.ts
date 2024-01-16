import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from '../../layout/private/private.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstablishmentComponent } from './pages/establishment/establishment.component';
import { EstablishmentManagerComponent } from './pages/establishment/pages/establishment-manager/establishment-manager.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'establishment',
        children: [
          {
            path: '',
            component: EstablishmentComponent,
          },
          {
            path: ':id',
            component: EstablishmentManagerComponent,
          },
        ],
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
