import { PaymentService } from './services/payment.service.js'
import { ProductService } from './services/product.service.js'


export class ProductController{

    buyProduct = (req, res) => {
        //1. 가진돈 검증하는 코드
        const paymentService = new PaymentService()
        const hasMoney = paymentService.checkBalance()
    
        //2. 판매여부 검증하는 코드
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldout()
    
        //3. 상품 구매하는 코드
        if(hasMoney && !isSoldOut){
            res.send('BUY PRODUCTS')
        }
    }

    refundProduct = (req, res) => {
        //1. 판매여부 검증 코드
        const productService = new ProductService()
        const isSoldOut = productService.checkSoldout()
    
        //2. 상품 환불 코드
        if(isSoldOut){
            res.send('REFUND PRODUCT')
        }
    }
}
