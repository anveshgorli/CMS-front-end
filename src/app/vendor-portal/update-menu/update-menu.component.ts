import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {

  menu: Item[];
  images: Observable<any>;
  vendorId: number;
  upload = false;
  
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  showImage = false;


  itemName: FormControl;
  itemPrice: FormControl;
  description: FormControl;

  currentItem: Item = new Item();

  updateForm: FormGroup;

  constructor(private itemService: ItemService, private vendorService: VendorService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.vendorId = +params.get("id");
      });

    this.reloadData();

    this.itemName = new FormControl();
    this.itemPrice = new FormControl();
    this.description = new FormControl();

    this.updateForm = new FormGroup({
      'itemName': this.itemName,
      'itemPrice': this.itemPrice,
      'description': this.description,
    });
  }

  reloadData()
  {
    this.vendorService.getMenuByVendorId(this.vendorId).subscribe(data => {
      this.menu = data;
    });

    this.images = this.itemService.getAllImages();

  }
  
  addItem()
  {
    this.router.navigate(['vendor', this.vendorId, 'updatemenu','add']);
  }

  
  updateItem()
  {
    
    this.itemService.updateItem(this.currentItem.itemId, this.updateForm.value).subscribe(data =>{
      console.log(data);
      this.reloadData();
    });

    this.onUpload();
    
    this.upload = false;
  }

  getItem(item: Item)
  {
    this.currentItem = item;
    this.itemName.setValue(this.currentItem.itemName);
    this.itemPrice.setValue(this.currentItem.itemPrice);
    this.description.setValue(this.currentItem.description);
  }

  deleteItem(item: Item)
  {
    var currentImage: Image;
    this.itemService.getImageByItemId(item.itemId).subscribe(data =>{
      currentImage = data;
      this.itemService.deleteImageByImageIdAndItemId(item.itemId,currentImage.imageId).subscribe(data => {
        console.log(data);
        this.vendorService.deleteItemByItemIdAndVendorId(item.itemId,this.vendorId).subscribe(data =>{
          console.log(data);
          this.reloadData();
        });
        //this.reloadData();
      });
    });
    
    
    
    
  }

  backToPortal()
  {
    this.router.navigate(['vendor', this.vendorId]);
  }

  //gets called when the user selects an image
  onFileChanged(event)
  {
    //select file
    this.selectedFile = event.target.files[0];
    this.upload = true;
  }

  onUpload()
  {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('itemImage',this.selectedFile, this.selectedFile.name);
    this.itemService.updateImageByItemId(this.currentItem.itemId, uploadImageData).subscribe(data =>{
      console.log(data);
    });

  }


}
