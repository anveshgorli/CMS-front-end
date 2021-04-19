export class Order
{
    orderId: string;
    customerId: number;
    amount: number;
    status: string;
    orderDate: Date = new Date();
    comments: string;
    prepTime: number;

    constructor() {};
}