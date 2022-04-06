import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProfileComponent } from './users/profile/profile.component';
import { SigninComponent } from './users/signin/signin.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'signin', component: SigninComponent},
  {path: 'products', component: ProductListComponent, canActivate:[AuthGuard]},
  {path: 'error', component: ErrorComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo:'/signin', pathMatch:'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
