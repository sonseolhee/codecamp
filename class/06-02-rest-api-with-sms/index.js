/**
 * import modules
 * - express
 * - swagger-Ui-express
 * - swagger-jsdoc
 */
import express from "express"
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swagger/config.js"
import cors from 'cors'


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


/**
 * port-number
 * - Default : 3000 
 */
app.listen(3000)