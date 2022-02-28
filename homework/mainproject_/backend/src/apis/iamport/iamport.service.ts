import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class IamportService {


  async getIamportAccessToken(){
    const getToken = await axios.post(
      'https://api.iamport.kr/users/getToken',
      {
        imp_key: process.env.IMPORT_REST_API_KEY,
        imp_secret: process.env.IMPORT_REST_API_SECRET
      }
    )
    const {access_token} = getToken.data.response
    console.log('💛 IMPAccessToken', access_token)

    return access_token
  }


  async getPaymentData({
    impUid,
    access_token
  }){

    const getPaymentData = await axios.get(
      `https://api.iamport.kr/payments/${impUid}`,
      {
        headers: {
          Authorization: access_token
        }
      }
    )
    console.log('💛 PaymentData',getPaymentData.data.response)
    return getPaymentData
  }


  async cancelPayment({
    impUid,
    amount,
    access_token,
  }){

    const cancelResult = await axios.post(
      "https://api.iamport.kr/payments/cancel",
      {
        amount: amount,
        imp_uid: impUid
      },
      {
        headers: {
          Authorization: access_token
        }
      }
    )
    
    console.log('💛 CancelResult', cancelResult)

    return cancelResult
  }

}