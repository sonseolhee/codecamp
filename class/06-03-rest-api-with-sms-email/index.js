/**
 * import modules
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))



app.post('/tokens/phone', (req, res) => {

    let phoneNumber = req.body.phoneNum
    const isValid = checkValidationPhone(phoneNumber)

    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken(6)
            
        // 3. 핸드폰번호에 토큰값 전송
        sendTokenToSMS(phoneNumber,myToken)
    }

})


// {
// 	"user" :{
// 		"name" : "영희",
// 		"age" : 8,
// 		"school":"다람쥐초등학교",
// 		"email": "elma1673@naver.com"
// 	}
// }

//function 이름 : 미들웨어 함수
app.post( "/users" , (req, res) => {

    const user = req.body.user
    let isValidEmail =  emailValidation(user.email)
    if( isValidEmail ){
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user)
         // 3. 이메일에 가입환영 템플릿 전송 (console.log)
        sendWelcomeMail(user , template)
    }

})



/**
 * port-number
 * - Default : 3000 
 */
app.listen(3000)