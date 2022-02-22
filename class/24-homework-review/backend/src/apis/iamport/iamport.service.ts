import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    //검증로직
    //1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다. (아임포트 API 요청)
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IMP_API_KEY,
        imp_secret: process.env.IMP_SECRET,
      });
      // console.log('💛', result.data.response.access_token);
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
      console.log(error);
    }
  }

  async checkPaid({ imp_uid, access_token }) {
    axios.get(`https://api.iamport.kr/payments/${imp_uid}`, {
      headers: { Atuthorizatoin: access_token },
    });
  }
}
