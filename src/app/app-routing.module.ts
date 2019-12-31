import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  ApproximationPropertiesDetailComponent
} from './approximation-properties/approximation-properties-detail/approximation-properties-detail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardUser, AuthGuardAdmin, AuthGuard} from './auth/auth.guard';
import {DataSeriesFileListComponent} from './data-series-file-list/data-series-file-list.component';
import {
  ApproximationPropertiesListUserComponent
} from './approximation-properties/approximation-properties-list/approximation-properties-list.component';
import {AddUserComponent} from './user/add-user/add-user.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {DataSeriesGeneratorComponent} from './data-series-generator/data-series-generator.component';


const routes: Routes = [
  {path: 'upload-file', component: UploadFileComponent, canActivate: [AuthGuardUser]},
  {path: 'approximation-properties-detail/:id', component: ApproximationPropertiesDetailComponent, canActivate: [AuthGuard]},
  {path: 'data-series-file-list', component: DataSeriesFileListComponent, canActivate: [AuthGuard]},
  {path: 'approximation-properties-list', component: ApproximationPropertiesListUserComponent, canActivate: [AuthGuard]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AuthGuardAdmin]},
  {path: 'user-list', component: UserListComponent, canActivate: [AuthGuardAdmin]},
  {path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'data-series-generator', component: DataSeriesGeneratorComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
