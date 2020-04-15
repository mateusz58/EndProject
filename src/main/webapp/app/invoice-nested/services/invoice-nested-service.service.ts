import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IInvoiceNested} from "../models/iinvoiceNested";


const apiUrl = '/api/invoices';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class InvoiceNestedService {

  private invoiceUrl = './api/invoices/final-Invoice.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IInvoiceNested[]> {
    return this .http.get<IInvoiceNested[]>(this.invoiceUrl).pipe(
        tap(data => console.log('All:' + JSON.stringify(data))),
            catchError(this.handleError)
    );
  }

  getById(id: number): Observable<IInvoiceNested | undefined> {
    return this.getAll()
        .pipe(
            map((objects: IInvoiceNested[]) => objects.find(p => p.id === id))
        );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
