import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {

  vendor: Vendor;
  vendorId: number;

  constructor(private vendorService: VendorService, private route: ActivatedRoute, private router: Router) { }

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

  update()
  {
    this.vendorService.updateVendor(this.vendorId,this.vendor).subscribe(data =>{

      console.log(data);
      this.vendor = data;
    });
    this.back();
  }

  back()
  {
    this.router.navigate(['vendor',this.vendorId,'details']);
  }

}
