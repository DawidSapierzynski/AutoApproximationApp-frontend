import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeriesPropertiesDetailComponent } from './series-properties-detail/series-properties-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from '../app/auth/auth-interceptor';
import { DataSeriesFileListComponent } from './data-series-file-list/data-series-file-list.component';
import { SeriesPropertiesListUserComponent } from './series-properties-list/series-properties-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SeriesPropertiesDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DataSeriesFileListComponent,
    SeriesPropertiesListUserComponent,
    AddUserComponent,
    UserListComponent,
    UploadFileComponent,
    LoadingIndicatorComponent,
    UserDetailComponent,
    MessageComponent
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
export class AppModule { }
