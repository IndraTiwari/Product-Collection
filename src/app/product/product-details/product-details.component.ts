import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: FormGroup;
  productValue: any = [];
  currentDate = new Date();

  constructor(
    private dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productValue = this.data;
    this.productDetails();
  }

  productDetails() {
    // for updating any record
    if (this.data) {
      this.productData = this.formBuilder.group({
        productName: [ this.productValue.productName,[Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
        category: [ this.productValue.category, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        availableUnits: [ this.productValue.availableUnits, [Validators.required]],
        unitPrice: [ this.productValue.unitPrice, [Validators.required]],
        location: [ this.productValue.location, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        date: [this.productValue.date, Validators.required],
        description: [ this.productValue.description, [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      });
    } else {
      // for adding a new record
      this.productData = this.formBuilder.group({
        productName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
        category: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        availableUnits: ['', [Validators.required]],
        unitPrice: ['', [Validators.required]],
        location: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        date: ['', Validators.required],
        description: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      });
    }
  }

  //adding a new item
  onSubmit() {
    let selectedDate = this.productData.value.date;

    //fomating date format
    // selectedDate = moment(this.productData.value.date).format('Do-MMM-YYYY');

    // this.productData.value.date = selectedDate;
    this.productService.addProduct(this.productData.value).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  //updating an existing item
  onEdit() {
    let id = this.productValue.id;

    // let selectedDate = moment(this.productData.value.date).format('Do-MMM-YYYY');
    // this.productData.value.date = selectedDate;
    this.productService.updateProduct(id, this.productData.value).subscribe(
      (res) => {
        this.dialogRef.close();
      },
      (error) => error
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  filterWeekend = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
}