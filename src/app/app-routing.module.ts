import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPropertiesComponent } from './series-properties/series-properties.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/auth/auth.guard';


const routes: Routes = [
  {path: 'series-properties', component: SeriesPropertiesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
