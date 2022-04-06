import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Product } from "src/app/product";
import { ProductService } from "src/app/services/product.service";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { QrDataComponent } from "src/app/qr-data/qr-data.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})

export class ProductListComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('htmlData') htmlData: ElementRef;

  product: Product[] = [];
  searchProduct: string;
  productList = new FormControl();
  message = 'Sorry no records found.';
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'title',
    'productName',
    'category',
    'availableUnits',
    'unitPrice',
    'location',
    'date',
    'description',
    'actions',
  ];
  filterProduct: Observable<Product[]>;
  showError: boolean = false;
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.filterProduct = this.productList.valueChanges.pipe(
      startWith(''),
      map((item) => (item ? this.filterItems(item) : this.product.slice()))
    );
  }

  ngOnInit() {
    this.getProductList();
  }

  // getting all data
  getProductList() {
    this.productService.getProducts().subscribe(
      (res: Product[]) => {
        this.product = res;
        this.dataSource = new MatTableDataSource(this.product);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        this.showError = true;
        console.log('error occured while fetching data', error);
      }
    );
  }

  // opening edit item dialog
  onEdit(element) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '500px',
      height: '630px',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getProductList();
    });
  }

  // opening dialog for adding an item
  newProduct() {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '500px',
      height: '620px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getProductList();
    });
  }

  //deleting an item from table
  onDelete(element) {
    this.productService.deleteProduct(element).subscribe((res) => {
      this.getProductList();
    });
  }

  // for searching
  productSearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //for filtering dropdown options
  filterItems(value: string): Product[] {
    const filterValue = value.toLowerCase();
    return this.product.filter(
      (item) => item.productName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }

  showQRD(element): void {
    const dialogRef = this.dialog.open(QrDataComponent, {
      // width:'380px',
      // height:'380px',
      data: element,
    });
  }

  public graphVal;
  public openModal(data): void {
    this.showModal = true;
    this.graphVal = data;
  }

  public clodeModal(data): void {
    this.showModal = false;
    console.log('showModal', this.showModal);
  }
}
