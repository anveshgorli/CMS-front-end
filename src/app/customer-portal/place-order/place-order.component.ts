import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Item } from 'src/app/model/item';
import { OrderedItem } from 'src/app/model/OrderedItem';
import { CustomerService } from 'src/app/service/customer.service';
import { ItemService } from 'src/app/service/item.service';
import { Order} from 'src/app/model/Order';
import { OrderService } from 'src/app/service/order.service';
import { OrderDetails } from 'src/app/model/orderDetails';
import { Image } from 'src/app/model/image';
import { Coupon } from 'src/app/model/coupon';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  menu: Item[];
  images: Image[];
  selectedItem: OrderedItem[] = [];
  totalAmount = 0;
  orderId: string = '';
  custId: number = 0;
  customer: Customer;
  order: Order;
  orderDetails: OrderDetails;
  orderTime: Date;
  prepTime: number =  Math.floor(Math.random()*30+1);
  coupons: Coupon[] = [];
  usedCoupons: Coupon[] = [];
  couponAmount = 0;
  currentDate = new Date();
  expireDate = new Date();
  clickSelectAll = false;
  //balance: number = 0;

  myForm: FormGroup;
  quantity: FormControl;


  
  constructor(private itemService: ItemService, private router: Router, private route:ActivatedRoute, private customerService: CustomerService, private orderService: OrderService) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.custId = +params.get("id");
      });

      this.customerService.getCustomer(this.custId).subscribe(data =>
        {
          this.customer = data;
        }, error => console.log(error));

    this.customerService.getAllCoupnsByCustomerId(this.custId).subscribe(data =>{
      this.coupons = data;
    });
    this.reloadData();

    

    this.quantity = new FormControl(1);
    this.myForm = new FormGroup({
      'quantity': this.quantity
    });
  }

  reloadData()
  {
    this.itemService.getMenu().subscribe(data =>{
      this.menu = data;
    });
    this.itemService.getAllImages().subscribe(data => {
      this.images = data;
    });
  }

  selectItem(item: Item)
  {
    var order = new OrderedItem(item);
    if (this.clickSelectAll == false)
      order.quantity = this.myForm.get('quantity').value;
    else
      order.quantity = 1;
    this.myForm.get('quantity').setValue(1);
    this.selectedItem.push(order);
    this.totalAmount = this.totalAmount + item.itemPrice*order.quantity;
    
  }

  deleteOrder(order: OrderedItem)
  {
    var index = this.selectedItem.indexOf(order);
    var amount = order.item.itemPrice * order.quantity;
    this.totalAmount = this.totalAmount - amount;
    this.selectedItem.splice(index,1);
  }

  orderPlaced()
  {
    this.orderId = ''+this.custId + Math.floor(Math.random()*100+1)+Math.random().toString(36).substr(2, 5);
    this.orderTime = new Date();
    this.order = new Order();
    this.order.orderId = this.orderId;
    this.order.customerId = this.custId;
    this.order.amount = this.totalAmount - this.couponAmount;
    this.order.status = "Order Placed";
    this.order.orderDate = this.orderTime;
    this.order.prepTime = this.prepTime;
      
    //save to database
    this.orderService.addOrder(this.order)
    .subscribe(data => {
      console.log(data);
    },
    error => console.log(error));

    //update coupon
    for (var i=0; i<this.usedCoupons.length; i++)
    {
      this.usedCoupons[i].orderId = this.orderId;
      this.customerService.updateCoupon(this.custId, this.usedCoupons[i].couponId, this.usedCoupons[i])
      .subscribe(data =>{
        console.log(data);
      });
    }

    //update customer
    this.customer.numberOfOrders = this.customer.numberOfOrders + 1;
    this.customerService.updateCustomer(this.custId, this.customer).subscribe(data =>{
      console.log(data);
    });
  }

  onPlaceOrder()
  {
    for (var i=0; i<this.selectedItem.length; i++)
    {
      this.orderDetails = new OrderDetails();
      this.orderDetails.itemId = this.selectedItem[i].item.itemId;
      this.orderDetails.itemName = this.selectedItem[i].item.itemName;
      this.orderDetails.itemPrice = this.selectedItem[i].item.itemPrice;
      this.orderDetails.quantity = this.selectedItem[i].quantity;
      this.orderDetails.totalPrice = this.orderDetails.itemPrice * this.orderDetails.quantity;
      this.orderDetails.vendorId = this.selectedItem[i].item.vendor.vendorId;
      this.orderDetails.status = "Order Placed";

      this.orderService.addOrderDetails(this.orderId , this.orderDetails)
      .subscribe(data => {
        console.log(data);
      },
      error => console.log(error));;
    }
    this.router.navigate(['customer', this.custId]);

    this.customer.balance = this.customer.balance - (this.totalAmount - this.couponAmount);
    //console.log(this.customer.balance);
    this.customerService.updateCustomer(this.custId,this.customer).subscribe(data =>{

      console.log(data);
      this.customer = data;
    });
  }

  backToPortal()
  {
    this.router.navigate(['customer',this.custId]);
  }

  onCheckboxChange(event,coupon)
  {
    if (event.target.checked)
    {
      this.couponAmount = this.couponAmount + coupon.value;
      this.usedCoupons.push(coupon);
    }
    else
    {
      this.couponAmount = this.couponAmount - coupon.value;
      var i = this.usedCoupons.indexOf(coupon);
      this.usedCoupons.splice(i,1);
    }
  }

  getExpireDate(coupon: Coupon): number
  {
    return new Date(coupon.expireDate).getTime();
  }

  //select all items on the menu
  selectAll()
  {
    this.clickSelectAll = true;
    for (var i=0; i<this.menu.length; i++)
    {
      this.selectItem(this.menu[i]);
    }
    this.clickSelectAll = false; // reset flag after adding all the items
  }



}
