import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    /**
     In certain situations `httpAdapter` might not be available in the
     constructor method, thus we should resolve it here.
     **/
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException ? exception.getResponse() : exception.toString();

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
      // @ts-ignore
      message: typeof message === 'object' ? message.message : message,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
