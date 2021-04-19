import { Vendor } from "./vendor";

export class Item
{
    itemId: number;
    itemName: string;
    itemPrice: number;
    description: string;
    vendor: Vendor;
    constructor() {}
}