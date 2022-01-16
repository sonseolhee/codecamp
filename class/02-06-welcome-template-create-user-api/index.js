/*
index.js
email.js
utils.js
*/
import { emailValidation, getWelcomeTemplate, sendWelcomeMail } from "./email.js"



//실행 함수
function createUser(user){
    // 1. email 정상인지 확인 (1-존재여부, 2-@포함여부 )
    let isValidEmail =  emailValidation(user.email)

    if( isValidEmail ){
        
        // 2. 가입환영 템플릿 만들기
        const template = getWelcomeTemplate(user)

         // 3. 이메일에 가입환영 템플릿 전송 (console.log)
        sendWelcomeMail(user , template)
    }
}



// Data from Front
const myuser = {
    name : "철수", 
    age : 8,
    school : "다람쥐초등학교",
    email : "a@gmail.com"
}

//실행
createUser(myuser)


