
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




    console.log(`${phoneNum} 번호로 인증번호 ${result} 전송합니다!!!!!!!!`)
}


