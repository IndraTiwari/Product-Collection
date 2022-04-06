import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Error occur from our side');
          errorMsg = `Error: ${error.error.message}`;
          // this.router.navigate(['/error']);
        } else {
          console.log('Error occured due to server side issue');
          errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          // this.router.navigate(['/error']);
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
