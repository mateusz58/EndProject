import { Component, OnInit } from '@angular/core';
import {IInvoiceNested} from "../models/iinvoiceNested";
import {InvoiceNestedService} from "../services/invoice-nested-service.service";

@Component({
  selector: 'app-invoice-nested',
  templateUrl: './invoice-nested.component.html',
  styleUrls: ['./styles-invoices-nested.css'],
  providers: [InvoiceNestedService]
})
export class InvoiceNestedComponentList implements OnInit {

  private  errorMessage = '';

  toggleEvent() {
    console.log("triggered")
  }

  _listFilter: string;

  filteredObjects: IInvoiceNested[] = [];

  objects: IInvoiceNested[] = [];

  constructor(private service : InvoiceNestedService) {
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredObjects = this._listFilter ? this.performFilter(this.listFilter) : this.objects;
  }

  get listFilter(): string {
    return this._listFilter;
    this.filteredObjects = this.listFilter ? this.performFilter(this.listFilter) : this.objects;
  }

  performFilter (filterBy : string): IInvoiceNested[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.objects.filter((object : IInvoiceNested) =>
        object.number.toLowerCase().indexOf(filterBy)!=-1);
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: objects =>
      {
        this.objects = objects;
        this.filteredObjects = objects;
      },
      error: err => this.errorMessage = err
    });
    this.filteredObjects = this.objects;
  }
}
