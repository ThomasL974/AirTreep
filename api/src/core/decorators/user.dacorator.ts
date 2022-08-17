import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Creating CurrentUser decorator
export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.userId;
  },
);