import express from 'express'
import { ProductController } from './mvc/controllers/product.controller.js'

const app = express()

//상품API
const productController = new ProductController()
app.post('/products/buy' , productController.buyProduct )
app.post('/products/refund', productController.refundProduct )

//쿠폰API


app.listen(3000)