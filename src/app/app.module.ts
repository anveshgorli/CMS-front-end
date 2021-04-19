import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { AddMoneyComponent } from './customer-portal/add-money/add-money.component';
import { CustomerDetailsComponent } from './customer-portal/customer-details/customer-details.component';
import { PlaceOrderComponent } from './customer-portal/place-order/place-order.component';
import { ViewTransactionComponent } from './customer-portal/view-transaction/view-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateCustomerComponent } from './customer-portal/customer-details/update-customer/update-customer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { VendorPortalComponent } from './vendor-portal/vendor-portal.component';
import { CustomerListComponent } from './vendor-portal/customer-list/customer-list.component';
import { UpdateMenuComponent } from './vendor-portal/update-menu/update-menu.component';
import { UpdateTransactionComponent } from './vendor-portal/update-transaction/update-transaction.component';
import { VendorDetailsComponent } from './vendor-portal/vendor-details/vendor-details.component';
import { AddItemComponent } from './vendor-portal/update-menu/add-item/add-item.component';
import { UpdateVendorComponent } from './vendor-portal/vendor-details/update-vendor/update-vendor.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,

    CustomerPortalComponent,

    CustomerDetailsComponent,
    AddMoneyComponent,
    PlaceOrderComponent,
    ViewTransactionComponent,
    UpdateCustomerComponent,
    HomePageComponent,
    ItemComponent,
    LoginComponent,
    ForgetPasswordComponent,
    MenuComponent,
    RegisterComponent,
    VendorPortalComponent,
    CustomerListComponent,
    UpdateMenuComponent,
    UpdateTransactionComponent,
    VendorDetailsComponent,
    AddItemComponent,
    UpdateVendorComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
