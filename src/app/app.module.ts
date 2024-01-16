import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PublicComponent } from './layout/public/public.component';
import { PrivateComponent } from './layout/private/private.component';
import { AuthModule } from './modules/auth/auth.module';
@NgModule({
  declarations: [AppComponent, PublicComponent, PrivateComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    // 3rd party
    AuthModule,
    // core & shared
    SharedModule,
    CoreModule,
    // app
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
