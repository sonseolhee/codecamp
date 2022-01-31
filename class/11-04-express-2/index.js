import express from 'express'

const app = express()

//상품구매
app.post('/products/buy' , (req, res) => {
    //1. 가진돈 검증하는 코드

    //2. 판매여부 검증하는 코드

    //3. 상품 구매하는 코드



    res.send('BUY PRODUCTS')
})



//상품환불
app.post('/products/refund', (req, res) => {
    //1. 판매여부 검증 코드

    //2. 상품 환불 코드


    res.send('REFUND PRODUCT')
})


app.listen(3000)