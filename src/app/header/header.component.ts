import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username: string;
public user:string;
constructor(public router: Router, private productService: ProductService) { }

public ngOnInit(): void {
  this.productService.newUserValue.subscribe(users => this.user = users);
}

public ngDoCheck(): void {
  this.username = localStorage.getItem('username');
}

public onLogout(): void{
  this.router.navigate(['/signin']);
  localStorage.removeItem('username');
}

public userProfile(): void{
  this.router.navigate(['/profile']);
}

get getUsername() {
  return localStorage.getItem('username');
}
}

// https://stackblitz.com/edit/angular-ivy-fk9mab?file=src%2Fapp%2Fapp.component.html
