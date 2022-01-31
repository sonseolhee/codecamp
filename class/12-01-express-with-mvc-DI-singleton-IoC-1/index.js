import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'
import { PaymentService } from './mvc/controllers/services/payment.service.js'
import { PointService } from './mvc/controllers/services/point.service.js'
import { ProductService } from './mvc/controllers/services/product.service.js'

const app = express()

const productService = new ProductService()
const paymentService = new PaymentService() //싱글톤패턴: new 한번으로 모든 곳에서 사용 가능
const paymentService2 = new PointService() //포인트 결제 추가


//상품API
const productController = new ProductController(productService, paymentService)
app.post('/products/buy' , productController.buyProduct )
app.post('/products/refund', productController.refundProduct )

//쿠폰API
const couponController = new CouponController(paymentService2)
app.post('/coupons/buy', couponController.buyCoupon )


app.listen(3000)