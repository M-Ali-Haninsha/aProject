import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AdminComponent } from './adminComponents/admin/admin.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminLoginComponent } from './adminComponents/admin-login/admin-login.component';

const routes: Routes = [
  {path:'', component: UserLoginComponent},
  {path:'userSignup', component: UserSignupComponent},
  {path:'adminHome', component: AdminComponent},
  {path:'userHome', component: UserHomeComponent},
  {path: 'admin', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
