import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export const GetUser = createParamDecorator((_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    return request.user;
});
