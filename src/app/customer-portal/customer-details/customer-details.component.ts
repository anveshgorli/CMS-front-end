import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  custId: number;
  customer: Customer;

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

  backToPortal()
  {
    this.router.navigate(['customer',this.custId]);
  }

  goUpdate()
  {
    this.router.navigate(['customer',this.custId,'details','update']);
  }

}
