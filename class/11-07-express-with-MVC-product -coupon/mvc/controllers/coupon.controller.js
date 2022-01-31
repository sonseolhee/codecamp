
import { PaymentService } from "./services/payment.service.js"

export class CouponController{


    buyCoupon = (req, res) => {
        
        const moneyService = new PaymentService()
        const hasMoney = moneyService.checkBalance()
        if(hasMoney){
            res.send('쿠폰을 구매합니다.')
        }
    }


}