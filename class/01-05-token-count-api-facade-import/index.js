import {checkValidationPhone, getToken, sendTokenToSMS} from './phone.js'

// console.log("--------createTokenOfPhone fn() Start---------")


//API 만들기
export function createTokenOfPhone(phoneNum, digit){
    // 1. 핸드폰번호 자릿수 확인
    const isValid = checkValidationPhone(phoneNum)

    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken(digit)
            
        // 3. 핸드폰번호에 토큰값 전송
        sendTokenToSMS(phoneNum,myToken)

        return myToken
    }
}

//API 실행하기
// createTokenOfPhone("01067411673" , 6)




