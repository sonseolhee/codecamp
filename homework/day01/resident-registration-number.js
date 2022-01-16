
// 퍼사드패턴 함수
function solution(socialNumber){

    let isValidDigit = digitValidation(socialNumber)
    let isValidStruct = structValidation(socialNumber)

    if( isValidDigit && isValidStruct ){
        encrypt(socialNumber)
    }

}

// 주민번호 가운데가 ”-” 로 구성 여부 확인
function structValidation(socialNumber){  
    let sn = socialNumber.split('')
    if(!sn.includes('-')){
        console.log("에러발생!!! 형식이 올바르지 않습니다!!!")
        return false
    }
    return true

}

//주민번호는 앞 6자리, 뒤 7자리로 구성 여부 확인
function digitValidation(socialNumber){

    let[front, back] = socialNumber.split('-')
    if( front.length !== 6 || back.length !== 7){
        console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!")
        return false
    }
    return true

}

// 끝 6자리는 *로 변경(암호화)
function encrypt(socialNumber){
    let arr = socialNumber.split('')
    let result = arr.fill('*', -6).join('')
    return console.log(result)
}


// 함수 실행
solution('920324-1038293')

