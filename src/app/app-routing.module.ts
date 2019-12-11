import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPropertiesDetailComponent } from './series-properties-detail/series-properties-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardUser, AuthGuardAdmin } from '../app/auth/auth.guard';
import { DataSeriesFileListUserComponent } from '../app/data-series-file-list-user/data-series-file-list-user.component';
import { SeriesPropertiesListUserComponent } from './series-properties-list/series-properties-list.component';
import { AddUserComponent } from '../app/add-user/add-user.component';
import { UserListComponent } from '../app/user-list/user-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';


const routes: Routes = [
  { path: 'upload-file', component: UploadFileComponent, canActivate: [AuthGuardUser] },
  { path: 'series-properties-detail/:id', component: SeriesPropertiesDetailComponent, canActivate: [AuthGuardUser] },
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
