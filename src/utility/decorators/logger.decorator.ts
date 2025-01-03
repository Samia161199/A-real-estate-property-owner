import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Logger = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.logger;
  },
);
