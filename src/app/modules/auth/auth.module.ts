import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
