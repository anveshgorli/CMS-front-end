import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  custId: number;
  customer: Customer;

  addedMoney: number;
  
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) { }
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.custId = +params.get("id");
      });

    this.customerService.getCustomer(this.custId).subscribe(data =>
      {
        console.log(data);
        this.customer = data;
      }, error => console.log(error));
  }

  addMoney()
  {
    this.customer.balance = +this.addedMoney + this.customer.balance;
    this.customerService.updateCustomer(this.custId,this.customer).subscribe(data =>{

      console.log(data);
      this.customer = data;
    });

    this.router.navigate(['customer',this.custId]);
  } 
    
  backToPortal()
  {
    this.router.navigate(['customer', this.custId]);
  }

}
