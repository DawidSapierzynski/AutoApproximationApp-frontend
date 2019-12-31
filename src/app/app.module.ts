import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  ApproximationPropertiesDetailComponent
} from './approximation-properties/approximation-properties-detail/approximation-properties-detail.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {DataSeriesFileListComponent} from './data-series-file-list/data-series-file-list.component';
import {
  ApproximationPropertiesListUserComponent
} from './approximation-properties/approximation-properties-list/approximation-properties-list.component';
import {AddUserComponent} from './user/add-user/add-user.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {UploadFileComponent} from './upload-file/upload-file.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {MessageComponent} from './message/message.component';
import {DataSeriesGeneratorComponent} from './data-series-generator/data-series-generator.component';
import {MinValidatorDirective} from './validators/min-validator.directive';
import {MaxValidatorDirective} from './validators/max-validator.directive';
import {EqualValidatorDirective} from './validators/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ApproximationPropertiesDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DataSeriesFileListComponent,
    ApproximationPropertiesListUserComponent,
    AddUserComponent,
    UserListComponent,
    UploadFileComponent,
    LoadingIndicatorComponent,
    UserDetailComponent,
    MessageComponent,
    DataSeriesGeneratorComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    EqualValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
