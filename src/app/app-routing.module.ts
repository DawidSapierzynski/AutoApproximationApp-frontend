import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPropertiesComponent } from './series-properties/series-properties.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardUser, AuthGuardAdmin } from '../app/auth/auth.guard';
import { DataSeriesFileListUserComponent } from '../app/data-series-file-list-user/data-series-file-list-user.component';
import { SeriesPropertiesListUserComponent } from './series-properties-list/series-properties-list.component';
import { AddUserComponent } from '../app/add-user/add-user.component';
import { UserListComponent } from '../app/user-list/user-list.component';


const routes: Routes = [
  { path: 'series-properties', component: SeriesPropertiesComponent, canActivate: [AuthGuardUser] },
  { path: 'data-series-file-list', component: DataSeriesFileListUserComponent, canActivate: [AuthGuardUser] },
  { path: 'series-properties-list', component: SeriesPropertiesListUserComponent, canActivate: [AuthGuardUser || AuthGuardAdmin] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuardAdmin] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
