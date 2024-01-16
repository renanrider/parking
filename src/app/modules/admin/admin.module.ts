import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstablishmentComponent } from './pages/establishment/establishment.component';
import { CreateVehicleDialogComponent } from './pages/establishment/pages/establishment-manager/components/create-vehicle-dialog/create-vehicle-dialog.component';
import { CreateEstablishmentDialogComponent } from './pages/establishment/components/create-establishment-dialog/create-establishment-dialog.component';
import { EstablishmentManagerComponent } from './pages/establishment/pages/establishment-manager/establishment-manager.component';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserDialogComponent } from './pages/users/components/create-user-dialog/create-user-dialog.component';

@NgModule({
  imports: [AdminRoutingModule, SharedModule],
  declarations: [
    DashboardComponent,
    EstablishmentComponent,
    EstablishmentManagerComponent,
    CreateVehicleDialogComponent,
    CreateEstablishmentDialogComponent,
    CreateUserDialogComponent,
    UsersComponent,
  ],
})
export class AdminModule {}
