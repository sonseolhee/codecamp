import { getCurrentDate } from "../../utils.js"
import axios from "axios"

export class EmailService {


    emailValidation = (email) =>{
        if( !email.includes('@') || !(email.length > 0)){
            console.log("이메일을 다시 입력해 주세요.")
            return false
        }
        return true   
    }


    getWelcomeTemplate = ( {name , email, personal, prefer, pwd, phone , og} ) =>{

        const createdAt = getCurrentDate()
    
        return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr/>
                <h4>가입정보</h4>
                <div>이름 : ${name}</div>
                <div>이메일 : ${email}</div>
                <div>주민번호: ${personal}</div>
                <div>좋아하는 사이트: ${prefer}</div>
                <div>비밀번호: ${pwd}</div>
                <div>핸드폰번호: ${phone}</div>
                <div>가입일 : ${createdAt}</div>
            </body>
        </html>
        `
    }

    sendWelcomeMail = (email, template) => {
    
        const appKey = process.env.EMAIL_APP_KEY
        const XSecretKey = process.env.EMAIL_X_SECRET_KEY
        const sender = process.env.EMAIL_SENDER
    
        axios.post(
            `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
            {
                senderAddress: sender,
                title: "[가입축하]이메일테스트",
                body: template,
                receiverList: [{
                    receiveMailAddr : email,
                    receiveType: "MRT0"
                }]
            },
            {
                headers: {
                    "X-Secret-Key": XSecretKey,
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        ).then()
    
    
    }


}