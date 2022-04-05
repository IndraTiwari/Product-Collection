import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { GraphComponent } from './graph/graph.component';
import { HeaderComponent } from './header/header.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { QrDataComponent } from './qr-data/qr-data.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
