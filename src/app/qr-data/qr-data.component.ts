import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-qr-data',
  templateUrl: './qr-data.component.html',
  styleUrls: ['./qr-data.component.css']
})
export class QrDataComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<QrDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}
  showData: any;
  ngOnInit(): void {
    console.log('show data value', this.data);
    this.showData =
      this.data.productName +
      ' ' +
      this.data.category +
      ' worth ' +
      this.data.unitPrice;
    // this.showData = JSON.stringify(this.data);
    console.log('show data value', this.showData);
  }
}