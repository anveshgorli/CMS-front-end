import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Vendor } from '../model/vendor';
import { CustomerService } from '../service/customer.service';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles = ['customer','vendor'];

  registerForm: FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  username: FormControl;
  password: FormControl;
  role: FormControl;
  foodSpecialization: FormControl;

  formSubmitted = false;

  constructor(private customerService: CustomerService, private router: Router, private vendorService: VendorService) { }

  ngOnInit(): void {

    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.role = new FormControl('customer');
    this.foodSpecialization = new FormControl('', Validators.required);

    this.registerForm = new FormGroup(
      {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'email': this.email,
        'username': this.username,
        'password': this.password,
        'role': this.role,
        'foodSpecialization': this.foodSpecialization
      }
    );

  }

  onSubmit()
  {
    if (this.role.value=="customer")
    {
      this.addCustomer(this.registerForm.value);
    }
    else
    {
      this.addVendor(this.registerForm.value);
    }
  }

  addCustomer(customer: Customer)
  {
    this.customerService.addCustomer(customer)
    .subscribe(data => {
      console.log(data)
    },
    error => console.log(error));

    this.formSubmitted = true;
  }

  addVendor(vendor: Vendor)
  {
    this.vendorService.addVendor(vendor)
    .subscribe(data => {
      console.log(data)
    },
    error => console.log(error));

    this.formSubmitted = true;
  }


}
