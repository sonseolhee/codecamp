import { ConflictException, HttpException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class IamportService {


  async getIamportAccessToken(){
    try{
      const getToken = await axios.post('https://api.iamport.kr/users/getToken',{
        imp_key: process.env.IMPORT_REST_API_KEY,
        imp_secret: process.env.IMPORT_REST_API_SECRET
      })
      const accessToken = getToken.data.response.access_token
      console.log('π IMPAccessToken', accessToken)
      return accessToken

    }catch(error){
      throw new HttpException(
        error.response.data.message,
        error.response.status 
      )
    }
  }

  async checkPayment({ impUid, amount, impAccessToken}){
    try{
      const checkPaymentData = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,{
          headers: {Authorization: impAccessToken}
        })
        console.log('π checkPaymentData', checkPaymentData)
        if( checkPaymentData.data.response.status !== 'paid' ) throw new ConflictException('κ²°μ  λ΄μ­μ΄ μ‘΄μ¬νμ§ μμ΅λλ€.')
        if( checkPaymentData.data.response.amount !== amount ) throw new UnprocessableEntityException('κ²°μ κΈμ‘μ΄ μλͺ»λμμ΅λλ€.')
        
    }catch(error){
      if( error ?.data.response.message){
        throw new HttpException(
          error.data.response.message,
          error.data.response.status
        )
      } else {
        throw error 
      }
    }
  }

  async cancelPayment({ impUid, accessToken }){
    try{
      const cancelResult = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        { imp_uid: impUid },
        { headers: { Authorization: accessToken } }
      )
      console.log('π Cancel Obj ',cancelResult)
      return cancelResult.data.response.cancel_amount

    }catch(error){
      console.log('π error', error)
      throw new HttpException(
        error.data.response.message,
          error.data.response.status
      )
    }
  }

}