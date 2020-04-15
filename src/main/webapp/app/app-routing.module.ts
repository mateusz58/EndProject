import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppAuthGuard} from "./app-auth.guard";
import {InvoiceNestedComponentList} from "./invoice-nested/component/invoice-nested.component";

const routes: Routes = [
  { path: 'invoices', component: InvoiceNestedComponentList, canActivate: [AppAuthGuard], data: { roles: ['user'] } },
  // { path: 'invoices/pdf/:id', component: InvoiceDetailsComponent },
  // { path: 'invoices/byNumber', component: InvoiceDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
