/**
 * import modules
 * - express
 * - swagger-Ui-express
 * - swagger-jsdoc
 */
import express from "express"
import mongoose from 'mongoose'
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js"
import { emailValidation, getWelcomeTemplate, sendWelcomeMail } from "./email.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swagger/config.js"
import cors from 'cors'
import dotenv from 'dotenv'
import { Boards } from "./models/board.model.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))



app.get('/boards', function (req, res) {

    const result = await Board.find({ writer: '철수'})
    console.log(result)

    res.send( 
        [
            { number: 1, writer: "짱구", title: "제목입니다~~~", contents: "내용이에요!!!" },
            { number: 2, writer: "영희", title: "좋은 날씨입니다!", contents: "내용@@@@@" },
            { number: 3, writer: "훈이", title: "점심 맛있게 드셨나요?!", contents: "식사 하셨나요?!" },
            { number: 4, writer: "맹구", title: "안녕하세요?!", contents: "내용이요!!!" }
        ]
    )

})

app.post('/boards', async function (req, res) {
    //DB저장
    const board = new Boards({ 
        writer: req.body.writer, 
        title: req.body.title, 
        contents: req.body.contents
    })
    //save() 실행할때 몽구스가 몽고DB에 보내서 저장
    await board.save()

    // console.log(req.body)
    res.send('등록완료')

})



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

//몽고DB에 접속
//네임 리졸루션(name resolution)
mongoose.connect('mongodb://my_database:27017/codecamp')


/**
 * port-number
 * - Default : 3000 
 */
app.listen(3000)








