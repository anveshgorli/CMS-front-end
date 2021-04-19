export class Coupon{
    couponId: number;
    code: string;
    generateDate: Date = new Date();
    value: number;
    expireDate: Date;
    orderId: string;
    

    constructor() {}
}