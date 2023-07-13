import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AdminComponent } from './adminComponents/admin/admin.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

const routes: Routes = [
  {path:'', component: UserLoginComponent},
  {path:'userSignup', component: UserSignupComponent},
  {path:'admin', component: AdminComponent},
  {path:'userHome', component: UserHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
