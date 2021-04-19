import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Vendor } from '../model/vendor';
import { CustomerService } from '../service/customer.service';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  roles = ['customer', 'vendor'];
  customers:Customer[] = [];
  vendors: Vendor[] = [];
  currentCustomer: Customer = null;
  currentVendor: Vendor = null;
  loginForm: FormGroup;

  username: FormControl;
  password: FormControl;
  role: FormControl;

  showErrorMessage = false;

  constructor(private customerService: CustomerService, private router: Router, private vendorService: VendorService) { }

  ngOnInit(): void {

    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.role = new FormControl('customer');
    this.loginForm = new FormGroup(
      {
        'username': this.username,
        'password': this.password,
        'role': this.role,
      }
    );

  }

  onSubmit()
  {
    if (this.role.value == "customer")
      this.customerLogin();
    else
      this.vendorLogin();
  } 
  
  customerLogin()
  {
    this.customerService.getCustomerList().subscribe(data => 
      {
        this.customers = data;

        this.customers.forEach(customer => 
          {
            if (customer.username == this.loginForm.get('username').value)
            {
              if (customer.password == this.loginForm.get('password').value)
                this.currentCustomer = customer;
            }
          });

        if (this.currentCustomer == null)
          this.showErrorMessage = true;
        else
          this.router.navigate(['customer',this.currentCustomer.customerId]);
        
      });

    this.showErrorMessage = false;
  }

  vendorLogin()
  {
    this.vendorService.getAllVendors().subscribe(data => 
      {
        this.vendors = data;

        this.vendors.forEach(vendor => 
          {
            if (vendor.username == this.loginForm.get('username').value)
            {
              if (vendor.password == this.loginForm.get('password').value)
                this.currentVendor = vendor;
            }
          });

        if (this.currentVendor == null)
          this.showErrorMessage = true;
        else
          this.router.navigate(['vendor',this.currentVendor.vendorId]);
        
      });

    this.showErrorMessage = false;
  }

}
