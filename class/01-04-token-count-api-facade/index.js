// console.log("안녕하세요~~")
import axios from "axios"

export function checkValidationPhone(phoneNum){
    if(phoneNum.length !== 10 && phoneNum.length !== 11){
        console.log('에러 : 핸드폰 번호를 정확히 입력해주세요')
        return false
    } else{
        return true
    }
}


export function getToken(digit){
   
    if(digit === undefined){
        console.log('에러 : 갯수를 정확히 입력해주세요.')
        return
    } else if(digit <= 0){
        console.log('에러 : 갯수가 너무 적습니다.')
        return
    } else if(digit > 10){
        console.log('에러 : 갯수가 너무 많습니다.')
        return
    }

    const result = String(Math.floor(Math.random()*(10**digit))).padStart(digit,"0")
    return result
}



export function sendTokenToSMS(phoneNum,result){

    axios.post("https://api-sms.cloud.toast.com/sms/v3.0/appKeys/EV5nTfgx0p27AL7j/sender/sms",
    {
        body : "안녕하세요. 인증번호는 {123456}입니다.",
        sendNo : "01067411673",
        recipientList : [{internationalRecipientNo:"01067411673" }]
    },
    {
        headers: {
            'X-Secret-Key': "0xVpaQ1W",
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    
    
    )

    console.log("===================전송끝=====================")
}


//API 만들기
export function createTokenOfPhone(phoneNum, digit){
    // 1. 핸드폰번호 자릿수 확인
    const isValid = checkValidationPhone(phoneNum)

    if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const myToken = getToken(digit)
            
        // 3. 핸드폰번호에 토큰값 전송
        sendTokenToSMS(phoneNum,myToken)
    }
}

//API 실행하기
createTokenOfPhone("01067411673" , 6)




