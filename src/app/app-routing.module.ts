import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPropertiesDetailComponent } from './series-properties/series-properties-detail/series-properties-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardUser, AuthGuardAdmin, AuthGuard } from '../app/auth/auth.guard';
import { DataSeriesFileListComponent } from '../app/data-series-file-list/data-series-file-list.component';
import { SeriesPropertiesListUserComponent } from './series-properties/series-properties-list/series-properties-list.component';
import { AddUserComponent } from '../app/add-user/add-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';


const routes: Routes = [
  { path: 'upload-file', component: UploadFileComponent, canActivate: [AuthGuardUser] },
  { path: 'series-properties-detail/:id', component: SeriesPropertiesDetailComponent, canActivate: [AuthGuard] },
  { path: 'data-series-file-list', component: DataSeriesFileListComponent, canActivate: [AuthGuard] },
  { path: 'series-properties-list', component: SeriesPropertiesListUserComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuardAdmin] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuardAdmin] },
  { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
