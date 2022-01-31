/**
 * Import modules
 * - express
 * - swagger-Ui-express
 * - swagger-jsdoc
 */
import express from "express"
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js"
import { emailValidation, getWelcomeTemplate, sendWelcomeMail } from "./email.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swagger/config.js"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))   //view Docs by "http://<app_host>:<app_port>/api-docs"



app.get('/users', function (req, res) {

    res.send([
        {
            email : "aaa@gmail.com", 
            name : "철수",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://naver.com"
        },
        { 
            email : "NODE@gmail.com", 
            name : "NODE",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://NODE.com"
        },
        { 
            email : "JSON@gmail.com", 
            name : "JSON",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://JSON.com"
        },
        { 
            email : "EXPRESS@gmail.com", 
            name : "EXPRESS",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://EXPRESS.com"
        },
        { 
            email : "SWAGGER@gmail.com", 
            name : "SWAGGER",
            phone : "01012345678",
            personal : "220110-2222222",
            prefer : "https://SWAGGER.com"
        }
    ])

})


app.get('/5', function (req, res) {

    res.send([
        { name: '아메리카노_!', kcal: 15 }, 
        { name: '아메리카노_A', kcal: 15 },
        { name: '아메리카노_B', kcal: 25 },
        { name: '아메리카노_C', kcal: 25 },
        { name: '아메리카노_D', kcal: 35 },
        { name: '아메리카노_E', kcal: 45 },
        { name: '아메리카노_F', kcal: 55 },
        { name: '아메리카노_G', kcal: 65 },
        { name: '아메리카노_H', kcal: 75 },
        { name: '아메리카노_I', kcal: 85 },
        { name: '아메리카노_Z', kcal: 95 }
    ])

})


app.post('/tokens/phone', (req, res) => {
    // console.log(req)
    let phoneNumber = req.body.phoneNum
    const isValid = checkValidationPhone(phoneNumber)

    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken(6)
            
        // 3. 핸드폰번호에 토큰값 전송
        res.send(sendTokenToSMS(phoneNumber,myToken))
    }
})

app.post( "/users" , (req, res) => {
    const user = req.body.user
    let isValidEmail =  emailValidation(user.email)
    if( isValidEmail ){
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user) 
         // 3. 이메일에 가입환영 템플릿 전송 (console.log)
        sendWelcomeMail(user , template)
    }
    return res
})


app.listen(3000)