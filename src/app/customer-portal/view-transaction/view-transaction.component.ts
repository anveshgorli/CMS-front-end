import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/model/coupon';
import { Order } from 'src/app/model/Order';
import { OrderDetails } from 'src/app/model/orderDetails';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {

  allOrders: Order[] = [];
  currentCustomerOrders: Order[] = [];
  currentCustomerCoupons: Coupon[] = [];
  currentOrderCoupons: Coupon[] = [];
  orderDetails: OrderDetails[];
  custId: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.custId = +params.get("id");
      });
    
    this.reloadData();

    this.customerService.getAllCoupnsByCustomerId(this.custId).subscribe(data =>{
      this.currentCustomerCoupons = data;
    });
  }

  reloadData()
  {
    this.currentCustomerOrders = [];
    this.orderService.getAllOrders().subscribe(data =>
      {
        this.allOrders = data;
        this.allOrders.forEach(order => {
          if (order.customerId == this.custId)
            this.currentCustomerOrders.push(order);
        });
      });
  }
  onClick()
  {
    this.router.navigate(['customer',this.custId]);
  }

  getDetails(orderId: string)
  {
    //get orderDetails for specific orderId 
    this.orderDetails = [];
    for (var i=0; i<this.currentCustomerOrders.length; i++)
    {
      if (this.currentCustomerOrders[i].orderId == orderId)
      {
        this.orderService.getAllOrderDetailsByOrderId(orderId).subscribe(data =>{
          this.orderDetails = data;
        });
      }
    }

    //get Coupons attached to the current orderId
    this.currentOrderCoupons = [];
    for (var i=0; i<this.currentCustomerCoupons.length; i++)
    {
      if (this.currentCustomerCoupons[i].orderId == orderId)
      {
        this.currentOrderCoupons.push(this.currentCustomerCoupons[i]);
      }
    }
  }

  getColor(status: string)
  {
    switch(status)
    {
      case 'Order Cancelled':
        return 'red';
      case 'Order Accepted':
        return 'green';
      default:
        return 'black';
    }
  }

  deleteOrder(orderId: string)
  {
    // get order details for specific orderId
    this.orderDetails = [];
    for (var i=0; i<this.currentCustomerOrders.length; i++)
    {
      if (this.currentCustomerOrders[i].orderId == orderId)
      {
        this.orderService.getAllOrderDetailsByOrderId(orderId).subscribe(data =>{
          this.orderDetails = data;
          
          //delete the order details for specific orderId
          this.orderService.deleteOrderDetailsByOrderId(orderId).subscribe(data =>{
            console.log(data);

            //delete the order by orderId
            this.orderService.deleteOrder(orderId).subscribe(order=>{
            console.log(order);
            this.reloadData();
        });
          });

        });

        
      }

      
    } 
  }

}
