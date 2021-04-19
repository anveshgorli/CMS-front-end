import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '../model/vendor';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-vendor-portal',
  templateUrl: './vendor-portal.component.html',
  styleUrls: ['./vendor-portal.component.css']
})
export class VendorPortalComponent implements OnInit {

  vendorId: number;
  vendor: Vendor;

  constructor(private route: ActivatedRoute, private vendorService: VendorService) { }

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

}
