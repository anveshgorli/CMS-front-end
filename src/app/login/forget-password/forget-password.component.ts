import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  roles = ['customer', 'vendor'];
  role: string;
  username: string;
  email: string;
  user: any;
  userExist = false;
  showErrorMessage = false;
  
  constructor(private customerService: CustomerService, private vendorService: VendorService) { }

  ngOnInit(): void {

    this.role = "customer";
  }

  onSubmit()
  {
    if (this.role == "customer")
    {
      this.customerService.getCustomerByUsernameAndEmail(this.username, this.email).subscribe(data =>{
        this.user = data;
        this.userExist = true;
      },erorr =>{
        this.showErrorMessage = true;
      });
    }
    else
    {
      this.vendorService.getVendorByUsernameAndEmail(this.username, this.email).subscribe(data =>{
        this.user = data;
        this.userExist = true;
      },erorr =>{
        this.showErrorMessage = true;
      });
    }
  }



}
