import {checkValidationPhone, getToken, sendTokenToSMS} from '../01-05-token-count-api-facade-import/phone.js'

console.log("안녕하세요~~")


//API 만들기
export default function createTokenOfPhone(phoneNum, digit){
    // 1. 핸드폰번호 자릿수 확인
    const isValid = checkValidationPhone(phoneNum)

    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken(digit)
            
        // 3. 핸드폰번호에 토큰값 전송
        sendTokenToSMS(phoneNum,myToken)

        return myToken;
    }
}

//API 실행하기
// createTokenOfPhone("01067411673" , 6)




