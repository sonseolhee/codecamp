
import { getCurrentDate } from "./utils.js"

// 1. email 정상인지 확인 (1-존재여부, 2-@포함여부 )
export function emailValidation(email){

    if( !email.includes('@') || !(email.length > 0)){
        console.log("이메일을 다시 입력해 주세요.")
        return false
    }
    return true

}

// 2. 가입환영 템플릿 만들기
export function getWelcomeTemplate( {name , age , school} ){

    const createdAt = getCurrentDate()

    return `
    <html>
        <body>
            <h1>${name}}님 가입을 환영합니다!!!</h1>
            <hr/>
            <div>이름 : ${name}</div>
            <div>나이 : ${age}살</div>
            <div>학교 : ${school}</div>
            <div>가입일 : ${createdAt}</div>
        </body>
    </html>
    `
}

 // 3. 이메일에 가입환영 템플릿 전송 (console.log)
 export function sendWelcomeMail(user, template){

    console.log(`${user.name}님에게 ${user.email}로 ${template}이 정상적으로 전송되었습니다.`)    

 }
