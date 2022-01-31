import express from 'express'

const app = express()

//상품구매
app.post('/products/buy' , (req, res) => {
    

    res.send('BUY PRODUCTS')
})



//상품환불
app.post('/products/refund', (req, res) => {


    res.send('REFUND PRODUCT')
})


app.listen(3000)