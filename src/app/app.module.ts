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
import { DataSeriesFileListUserComponent } from './data-series-file-list-user/data-series-file-list-user.component';
import { SeriesPropertiesListUserComponent } from './series-properties-list/series-properties-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SeriesPropertiesDetailComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DataSeriesFileListUserComponent,
    SeriesPropertiesListUserComponent,
    AddUserComponent,
    UserListComponent,
    UploadFileComponent
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
