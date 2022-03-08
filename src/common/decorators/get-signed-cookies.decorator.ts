import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSignedCookies = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.signedCookies;
    return request.signedCookies[data];
  },
);
