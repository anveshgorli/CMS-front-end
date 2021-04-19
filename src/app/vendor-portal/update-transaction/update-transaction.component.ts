import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/Order';
import { OrderDetails } from 'src/app/model/orderDetails';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent implements OnInit {

  allOrders: Order[] = [];
  orderDetails: OrderDetails[] = [];
  vendorId: number;
  status=['Order Placed', 'Order Accepted','Order Cancelled'];
  currentOrderDetail: OrderDetails = null;

  statusForm: FormGroup;
  changeStatus: FormControl;
  comments: FormControl;
  
  customer: Customer;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.vendorId = +params.get("id");
      });

    this.orderService.getAllOrders().subscribe(data =>
      {
        this.allOrders = data;
        });
    
    this.orderService.getAllOrderDetailsByVendorId(this.vendorId).subscribe(data => {
      this.orderDetails = data;
      console.log(data);
    });
    
    this.changeStatus = new FormControl('Order Placed');
    this.comments = new FormControl('');
    this.statusForm = new FormGroup(
      {
        'changeStatus': this.changeStatus,
        'comments': this.comments
      });
  }

  getOrderDetail(orderDetail: OrderDetails)
  {
    this.currentOrderDetail = orderDetail;
  }

  onClick()
  {
    this.router.navigate(['vendor', this.vendorId]);
  }

  save()
  {
    this.currentOrderDetail.status = this.statusForm.get('changeStatus').value;
    this.currentOrderDetail.comments = this.statusForm.get('comments').value;
    this.orderService.updateOrderDetails(this.currentOrderDetail.orderDetailsId,this.currentOrderDetail).subscribe(data =>{
      this.currentOrderDetail = data;
      
      //update the status of order
      this.updateOrderStatus();

      if (this.currentOrderDetail.status == "Order Cancelled")
      {
      // return money to customer's balance
      this.customerService.getCustomer(this.currentOrderDetail.order.customerId).subscribe(data =>
        {
          this.customer = data;
          this.addMoneyBack();
        }, error => console.log(error));

      
      }
    });

    

    
  }

  addMoneyBack()
  {
    this.customer.balance = this.currentOrderDetail.totalPrice+this.customer.balance;
      this.customerService.updateCustomer(this.currentOrderDetail.order.customerId,this.customer).subscribe(data =>{
        console.log(data);
        this.customer = data;
      });
  }

  updateOrderStatus()
  {
    //get all the details which have the same orderId with currentOrderDetail
    var allOrderDetails: OrderDetails[];
    this.orderService.getAllOrderDetailsByOrderId(this.currentOrderDetail.order.orderId).subscribe(data =>{
      allOrderDetails = data;

      //counter for accept, placed and cancelled repsectively
      var accept = 0;
      var placed = 0;
      var cancel = 0;

      for (var i=0; i<allOrderDetails.length;i++)
      {
        if (allOrderDetails[i].status == "Order Placed")
            placed = placed+1;
        else if (allOrderDetails[i].status == "Order Accepted")
            accept = accept+1;
        else
            cancel = cancel + 1;
      }
      console.log(placed);
      console.log(accept);
      console.log(cancel);
      //change the status to 'partially accepted','order cancelled','order accepted'
      //according to the 3 counters above
      
      //if all the order details are accepted or cancelled
      if (placed == 0)
      {
        //all the order details are accepted
        if (accept == allOrderDetails.length)
            this.currentOrderDetail.order.status = "Order Accepted";
        //all the order details are cancelled
        else if (cancel == allOrderDetails.length)
            this.currentOrderDetail.order.status = "Order Cancelled";
        //other situation
        else
            this.currentOrderDetail.order.status = "Partially Accepted";
      }
      else
      {
        //at least one order is accepted
        if (accept > 0)
            this.currentOrderDetail.order.status = "Partially Accepted";
        //no order is accepted
        else
            this.currentOrderDetail.order.status = "Partially Cancelled";
      }

      //update order in database
      var updatedOrder = this.currentOrderDetail.order;
      this.orderService.updateOrder(updatedOrder.orderId, updatedOrder).subscribe(data =>{
        console.log(data);
      });

    });

  }

}
