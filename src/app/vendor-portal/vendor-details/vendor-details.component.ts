import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  vendorId: number;
  vendor: Vendor;
  
  constructor(private route: ActivatedRoute, private vendorService: VendorService, private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.vendorId = +params.get("id");
      });

    this.vendorService.getVendor(this.vendorId).subscribe(data =>
      {
        console.log(data);
        this.vendor = data;
      }, error => console.log(error));
  }

  backToPortal()
  {
    this.router.navigate(['vendor', this.vendorId]);
  }

  goUpdate()
  {
    this.router.navigate(['vendor',this.vendorId,'details','update']);
  }

}
