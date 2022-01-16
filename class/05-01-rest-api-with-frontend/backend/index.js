/**
 * import modules
 * - express
 * - swagger-Ui-express
 * - swagger-jsdoc
 */
import express from "express"
import { createTokenOfPhone } from "../../01-05-token-count-api-facade-import/index.js" 
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swagger/config.js"
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))


/**
 * REST API EndPoint
 * [GET]    : /boards
 * [POST]   : /boards
 */
app.get('/boards', function (req, res) {

    res.send( 
        [
            { number: 1, writer: "짱구", title: "제목입니다~~~", contents: "내용이에요!!!" },
            { number: 2, writer: "영희", title: "좋은 날씨입니다!", contents: "내용@@@@@" },
            { number: 3, writer: "훈이", title: "점심 맛있게 드셨나요?!", contents: "식사 하셨나요?!" },
            { number: 4, writer: "맹구", title: "안녕하세요?!", contents: "내용이요!!!" }
        ]
    )

})


app.post('/boards', function (req, res) {

    console.log(req.body)
    res.send('!!!POST COMPLETED!!!')

})


app.post('/tokens/phone', function (req , res) {

    const phoneNumber = req.body.phoneNumber
    const tokenString = createTokenOfPhone(phoneNumber , 6)
    console.log(tokenString)
    res.send(tokenString + " : 인증완료")

})



/**
 * port-number
 * - Default : 3000 
 */
app.listen(3000)