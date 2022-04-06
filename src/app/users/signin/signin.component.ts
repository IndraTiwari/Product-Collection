import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public hide: boolean = true;
  public signInForm: FormGroup;
  public userName = new FormControl("", [Validators.required]);
  public password = new FormControl("", [Validators.required, Validators.pattern("^(?=.{8,})(?=.*[a-z0-9])(?=.*[A-Z0-9])(?=.*[@#$%^&+*!=])(?=.*[\d])(?=.*[0-9]).*$")]);
  
  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.createForm();
  }
  
  public createForm(): void {
    this.signInForm = this.formBuilder.group({
      userName: this.userName,
      password: this.password
    })
  }
  
  public showPassword(): void {
    this.hide = !this.hide;
  }
  
  public onSubmit(): void {
    this.signInForm.markAllAsTouched();
    if(this.signInForm.valid){
      this.router.navigate(['/products']);
      localStorage.setItem('username',this.signInForm.value.userName);
      this.productService.editUser(localStorage.getItem('username'));
    }
    }
  
  }
  
  // https://stackblitz.com/edit/currency-format-directive?file=src%2Fapp%2Fusd-only.directive.ts
  // @HostListener('focus', ['$event.target.value']) onfocusin(evt) {
  //   evt = this.el.nativeElement.value;
  //   const numberFormat = parseInt(String(evt).replace(this.currencyChars, ''));
  //   // console.log('ff',numberFormat)
  //   this.renderer.setProperty(this.el.nativeElement, 'value', numberFormat);
  // }
  
  // @HostListener('focusout', ['$event.target.value']) onfocusout(evt:string) {
  //   this.format(evt)
  // }