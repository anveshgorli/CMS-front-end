import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  vendorId: number;
  customers: Observable<Customer[]>;

  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      {
        this.vendorId = +params.get("id");
      });
    this.reloadData();
  }

  reloadData()
  {
    this.customers = this.customerService.getCustomerList();
  }

  onClick()
  {
    this.router.navigate(['vendor',this.vendorId])
  }

}
