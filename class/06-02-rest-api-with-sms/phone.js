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


export function sendTokenToSMS(phoneNum,token){


    const appKey = process.env.SMS_APP_KEY
    const XSecretKey = process.env.SMS_X_SECRET_KEY
    const sender = process.env.SMS_SENDER


    const result = axios.post(`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`,
        {
            body : `안녕하세요. 인증번호는 ${token}입니다.`,
            sendNo : sender,
            recipientList : [{internationalRecipientNo: phoneNum }]
        },
        {
            headers: {
                'X-Secret-Key': XSecretKey,     //?
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
    )
    
    console.log(result) 
    console.log("===================전송끝=====================")

}


