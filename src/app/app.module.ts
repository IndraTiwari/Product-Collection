import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { GraphComponent } from './graph/graph.component';
import { HeaderComponent } from './header/header.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { QrDataComponent } from './qr-data/qr-data.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { MaterialModule } from './material/material.module';
import { SharedModule } from '../app/shared/shared.module';
import { DecimalPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    GraphComponent,
    HeaderComponent,
    ProductDetailsComponent,
    ProductListComponent,
    QrDataComponent,
    ProfileComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AvatarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlingInterceptor,
    multi: true 
   },DecimalPipe],
  entryComponents:[ProductDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
