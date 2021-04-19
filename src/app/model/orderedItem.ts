import { Item } from "./item";

export class OrderedItem
{
    item: Item;
    quantity = 1;

    constructor(item: Item) {
        this.item = item;
    }
}