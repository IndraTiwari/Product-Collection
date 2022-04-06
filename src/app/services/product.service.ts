import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:3000/products';
  // private url = 'http://localhost:8008/products';

  baseUrl = 'http://localhost:3000';
  restUrl = '/products';
  product: Product[];

  constructor(private http: HttpClient) {}

  //url's having header request with them --> api having header then passs it with the url
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //for getting list
  getProducts(): Observable<Product[]> {
    console.log('this.baseurl',this.baseUrl);
    console.log('this.resturl', this.restUrl);
    return this.http
      .get<Product[]>(this.baseUrl + this.restUrl)
      // .pipe(catchError(this.handleError));
  } // when the params are known to us then we can use model class array with Observable and http method like this way

  //  both way it will work above way as well as below way
  //   getProducts(): Observable<any> {
  //     return this.http.get(this.url).pipe(catchError(this.handleError));
  // }

  //for adding items
  addProduct(param): Observable<Product[]> {
    return this.http
      .post<Product[]>(this.url, param)
      // .pipe(catchError(this.handleError));
  }

  //for deleting a particular item
  deleteProduct(id): Observable<Product[]> {
    return this.http
      .delete<Product[]>(this.url + '/' + id)
      // .pipe(catchError(this.handleError));
  }

  //for updating a particular item
  updateProduct(id, param): Observable<Product[]> {
    return this.http
      .put<Product[]>(this.url + '/' + id, param)
      // .pipe(catchError(this.handleError));
  }

  //handling errors
  handleError(error: HttpErrorResponse) {
    //for client side error
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      //error from backend or server side error
      console.error(`${error.status},` + `${error.message}`);
    }

    //retur observable with error facing by user
    return throwError('something went wrong');
  }

  private userValue = new BehaviorSubject<string>('');
  newUserValue = this.userValue.asObservable();

  public editUser(newValue): void {
    this.userValue.next(newValue);
  }
}
