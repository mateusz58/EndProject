import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule, TooltipModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { environment } from 'src/main/webapp/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwoDigitDecimalNumberDirective } from './shared/directives/two-digit-decimal-number.directive';
import { HttpErrorInterceptor} from './interceptor/http-error.interceptor';

import { AlertComponent } from './components/alert/alert.component';
import { StarsComponent } from './shared/stars/stars.component';
import { HomeComponent } from './home/home.component';
import {InvoiceNestedComponentList} from "./invoice-nested/component/invoice-nested.component";

export function kcInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init(environment.keycloakOptions);
        console.log('Keycloak is initialized');
        resolve();
      } catch (error) {
        console.log('Error thrown in init ' + error);
        reject(error);
      }
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimalNumberDirective,
    AlertComponent,
      StarsComponent,
      InvoiceNestedComponentList,
      HomeComponent
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: kcInitializer, multi: true, deps: [KeycloakService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
