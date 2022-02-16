import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const msg = exception.message;

    console.log('=================================');
    console.log('ERROR');
    console.log('에러내용:', msg);
    console.log('에러코드:', status);
    console.log('==================================');
  }
}
