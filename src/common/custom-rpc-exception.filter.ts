import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class CustomRpcExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger('CustomRpcExceptionFilter');

  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    this.logger.error(exception);
    response.status(400).json({ status: 400, message: exception.message });
  }
}
