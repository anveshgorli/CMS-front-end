import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from '../model/image';
import { Item } from '../model/item';
import { OrderedItem } from '../model/OrderedItem';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  menu: Item[];
  images: Image[];

  retrieveRespnse: any;


  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.reloadData();

  }

  reloadData()
  {
    //this.menu = this.itemService.getMenu();
    
    this.itemService.getMenu().subscribe(data =>{
      console.log(data);
      this.menu = data;
    });

    this.itemService.getAllImages().subscribe(data =>{
      console.log(data);
      this.images = data;
    });
  }

}
