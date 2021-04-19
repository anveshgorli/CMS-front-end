import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from '../model/coupon';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-portal',
  templateUrl: './customer-portal.component.html',
  styleUrls: ['./customer-portal.component.css']
})
export class CustomerPortalComponent implements OnInit {

  custId: number;
  customer: Customer;
  coupons: Coupon[] = [];
  couponSaved = false;
  clicked = false;
  numberOfOrders:number = 0;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.custId = +params.get("id");
      });

    this.customerService.getCustomer(this.custId).subscribe(data =>
      {
        //console.log(data);
        this.customer = data;
      }, error => console.log(error));

    
    this.customerService.getAllCoupnsByCustomerId(this.custId).subscribe(data =>{
      this.coupons = data;
    });
      
  }

  goDetails()
  {
    this.router.navigate(['customer',this.custId,'details']);
  }

  //save the coupon into database
  saveCoupon()
  {
    var coupon = new Coupon();
    //random generate a coupon code
    coupon.code = ""+Math.floor(Math.random()*100+1)+Math.random().toString(36).substr(2, 5);
    coupon.expireDate = new Date();
    coupon.value = 1;
    coupon.expireDate.setDate(coupon.generateDate.getDate() + 10);
    
    this.customerService.saveCouponByCustomerId(this.custId, coupon).subscribe(data => {
      console.log(data);
      this.couponSaved = true;
      this.clicked = true;
    });
  }

}
