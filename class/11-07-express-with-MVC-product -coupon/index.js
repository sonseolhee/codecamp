import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'

const app = express()

//상품API
const productController = new ProductController()
app.post('/products/buy' , productController.buyProduct )
app.post('/products/refund', productController.refundProduct )

//쿠폰API
const couponController = new CouponController()
app.post('/coupons/buy', couponController.buyCoupon )


app.listen(3000)