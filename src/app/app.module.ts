import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    LoginComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
