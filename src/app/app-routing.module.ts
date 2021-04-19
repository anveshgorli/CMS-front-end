import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddMoneyComponent } from './customer-portal/add-money/add-money.component';
import { CustomerDetailsComponent } from './customer-portal/customer-details/customer-details.component';
import { UpdateCustomerComponent } from './customer-portal/customer-details/update-customer/update-customer.component';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { PlaceOrderComponent } from './customer-portal/place-order/place-order.component';
import { ViewTransactionComponent } from './customer-portal/view-transaction/view-transaction.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { CustomerListComponent } from './vendor-portal/customer-list/customer-list.component';
import { AddItemComponent } from './vendor-portal/update-menu/add-item/add-item.component';
import { UpdateMenuComponent } from './vendor-portal/update-menu/update-menu.component';
import { UpdateTransactionComponent } from './vendor-portal/update-transaction/update-transaction.component';
import { UpdateVendorComponent } from './vendor-portal/vendor-details/update-vendor/update-vendor.component';
import { VendorDetailsComponent } from './vendor-portal/vendor-details/vendor-details.component';
import { VendorPortalComponent } from './vendor-portal/vendor-portal.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'vendor/:id', component: VendorPortalComponent},
  {path: 'vendor/:id/customer-list', component:CustomerListComponent},
  {path: 'customer/:id', component: CustomerPortalComponent},
  {path: '', component: LoginComponent},
  {path: 'customer/:id/details', component: CustomerDetailsComponent},
  {path: 'customer/:id/addmoney', component: AddMoneyComponent},
  {path: 'customer/:id/placeorder', component:PlaceOrderComponent},
  {path: 'customer/:id/transaction', component: ViewTransactionComponent},
  {path: 'customer/:id/details/update', component: UpdateCustomerComponent},
  {path: 'vendor/:id/details', component: VendorDetailsComponent},
  {path: 'vendor/:id/transaction', component: UpdateTransactionComponent},
  {path: 'vendor/:id/updatemenu', component: UpdateMenuComponent},
  {path: 'vendor/:id/updatemenu/add', component: AddItemComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'vendor/:id/details/update', component: UpdateVendorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
