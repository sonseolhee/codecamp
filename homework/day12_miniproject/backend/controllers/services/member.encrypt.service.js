

export class EncryptService {


    encryptPersonal= (socialNumber)=>{

        let isValidDigit = this.digitValidation(socialNumber)
        let isValidStruct = this.structValidation(socialNumber)
    
        if( isValidDigit && isValidStruct ){
            return this.encrypt(socialNumber)
        }
    
    }

    structValidation = (socialNumber)=>{  
        let sn = socialNumber.split('')
        if(!sn.includes('-')){
            console.log("에러발생!!! 형식이 올바르지 않습니다!!!")
            return false
        }
        return true
    
    }

    digitValidation=(socialNumber)=>{

        let[front, back] = socialNumber.split('-')
        if( front.length !== 6 || back.length !== 7){
            console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!")
            return false
        }
        return true
    
    }


    encrypt = (socialNumber)=>{
        let arr = socialNumber.split('')
        let result = arr.fill('*', -6).join('')
        return result
    }

}