import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../model/image';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Item;
  image: Image = new Image();

  constructor(private itemService: ItemService) { 
    
  }

  ngOnInit(): void {

    this.itemService.getImageByItemId(this.item.itemId).subscribe(data => {
      console.log(data);
      this.image = data;
    });
  }


}
