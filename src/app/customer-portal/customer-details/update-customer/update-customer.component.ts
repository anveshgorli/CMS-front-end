import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

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

  update()
  {
    this.customerService.updateCustomer(this.custId,this.customer).subscribe(data =>{

      console.log(data);
      this.customer = data;
    });
    this.back();
  }

  back()
  {
    this.router.navigate(['customer',this.custId,'details']);
  }

}
