console.log("안녕하세요~~")

function getToken(digit){

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
    console.log(result)
}

// getToken(4)
getToken(-11)

