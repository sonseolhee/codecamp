
import { PaymentService } from "./services/payment.service.js"

export class CouponController{

    constructor(paymentService){
        this.paymentService = paymentService
    }
    buyCoupon = (req, res) => {
        
        // const moneyService = new PaymentService()
        const hasMoney = this.paymentService.checkBalance()
        if(hasMoney){
            res.send('쿠폰을 구매합니다.')
        }
    }


}