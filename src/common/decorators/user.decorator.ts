import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UserDecorator = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data]
    }
    return request.user
  }
)