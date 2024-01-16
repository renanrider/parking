import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [UserRoutingModule, SharedModule],
  declarations: [DashboardComponent],
})
export class UserModule {}
