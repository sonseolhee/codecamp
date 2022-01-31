import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios'
import cheerio from 'cheerio'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { options } from './swagger/config.js'

import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'

import { Token } from './models/token.model.js'
import { Starbucks } from './models/starbucks.model.js'
import { UserController } from './controllers/user.controller.js'

const app = express()

app.use(express.json())
app.use(cors())
//http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

mongoose.connect('mongodb://my_database:27017/codecamp_be')


const userController = new UserController()
app.post('/user', userController.memberRegister )
app.get('/users', userController.memberList )





//토큰 인증 요청 API: POST /tokens/phone
/**
 * Request body : {phone:01067411673}
 * Rosponse : `인증번호 전송 완료 : ${myToken}`
 */
app.post('/tokens/phone', async (req, res) => {

    const isValid = checkValidationPhone(req.body.phone) //return : boolean

    if(!isValid){
        res.send('핸드폰 번호를 제대로 입력해 주세요')
        return
    }

    const myToken = getToken(6)
    sendTokenToSMS(req.body.phone, myToken)

    const prevTokenInfo = await Token.findOne({phone: req.body.phone})
    console.log(prevTokenInfo)
    if(prevTokenInfo){
        prevTokenInfo.token = myToken
        await prevTokenInfo.save()
        res.send(`인증번호 전송 : ${myToken}`)
        return
    }

    const token = new Token({
        token: myToken,
        phone: req.body.phone,
        isAuth: false
    })
    await token.save()

    //front end 받을 값 확인
    res.send(`인증번호 전송 완료 : ${myToken}`)

})

//인증 완료 API: PATCH /tokens/phone
/**
 * Request body : {phone:01067411673, token:123456}
 * Rosponse : Boolean(true,false)
 */
app.patch('/tokens/phone', async (req, res) =>{

    //phoneNum , token 값 req로 넘어옴
    const token = await Token.findOne({ phone: req.body.phone})
    if(!token){
        res.send(false)
        return
    }
    
    //checkValidation
    if(token.token !== req.body.token){
        res.send(false)
        return
    }

    await Token.updateOne({phone:req.body.phone}, {$set: {isAuth: true}})
    res.send(true)
})


//스타벅스 커피 목록 조회API: GET /starbucks
/**
 * Parameter/Request body : none
 * Rosponse : {_id : ab12314dafjldifal.. , name: 콜드브루, img: "https://image.isStarbucks......"}
 */
app.get('/starbucks', async (req, res) =>{
    
    const stCoffee = await Starbucks.find()
    res.send(stCoffee)
})

app.post('/starbucks', async (req, res) =>{
    // console.log(req.body)
    const coffee = new Starbucks({
        name: req.body.name,
        img: req.body.img
    })

    await coffee.save()
    res.send()

})



app.listen(3000)




