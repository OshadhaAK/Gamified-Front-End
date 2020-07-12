import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { Grade1Component } from './grade1/grade1.component';
import { Grade2Component } from './grade2/grade2.component';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { from } from 'rxjs';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import {BlockUiService} from './services/block-ui.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {WebcamModule} from 'ngx-webcam';
import {DataService} from './services/data.service';
import { CameraSnapshotComponent } from './camera-snapshot/camera-snapshot.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    Grade1Component,
    Grade2Component,
    CompareValidatorDirective,
    CameraSnapshotComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    WebcamModule
  ],
  providers: [LoginService, RegisterService, DataService, BlockUiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
