import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  // (data: any, context: ExecutionContext) => {
  // Since no data will be supplied to Decorator changing it's type to never
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
);