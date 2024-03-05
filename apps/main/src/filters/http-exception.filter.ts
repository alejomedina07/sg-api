import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { message } = exception.getResponse() as { message: object[] };
    let resMessage;

    if (Array.isArray(message)) {
      resMessage = message.reduce((pv, cv) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pv[cv.substring(0, cv.indexOf(':'))] = cv.substring(
          // @ts-ignore
          cv.indexOf(':') + 1,
        );
        return pv;
      }, {});
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (typeof message === 'string' && message?.toString())
      // @ts-ignore
      resMessage = message.toString();
    else {
      let errorMessage = exception.getResponse() as string;
      if (
        typeof errorMessage === 'string' &&
        errorMessage.includes('unique constraint')
      ) {
        errorMessage = errorMessage.slice(
          errorMessage.indexOf('unique constraint') + 19,
          errorMessage.indexOf('_unique'),
        );
        const reg = /[-_]\w/g;

        errorMessage = errorMessage.replace(reg, (match) => {
          return match.charAt(1).toUpperCase();
        });
        resMessage = { [errorMessage]: 'Ya existe el campo ' + errorMessage };
      } else resMessage = exception.getResponse();
    }

    response.status(status).json({
      statusCode: status,
      message: resMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
