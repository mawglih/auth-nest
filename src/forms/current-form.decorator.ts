import {
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';

export const CurrentForm = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        console.log(req.session);
        return req.currentForm;
    }
)