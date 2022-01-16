/**
 * Import modules
 * - express
 * - swagger-Ui-express
 * - swagger-jsdoc
 */
import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import { options } from "./swagger/config.js"

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))   //view Docs by "http://<app_host>:<app_port>/api-docs"


/**
 * REST API EndPoint
 * 회원목록조회API [GET] : /users
 * 커피목록조회API [GET] : /5
 * 
 */
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



/**
 * port-number
 * - Default : 3000 
 */
app.listen(3000)