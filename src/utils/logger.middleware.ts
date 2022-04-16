import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('finish', () => {
      const { statusCode } = response;
      // console.log({ statusCode });
      const contentLength = response.get('content-length');

      const logContent = `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;

      statusCode >= 400
        ? this.logger.error(logContent)
        : this.logger.log(logContent);
    });

    next();
  }
}
