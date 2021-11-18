import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { FormsService } from "../forms.service";

@Injectable()
export class CurrentFormInterceptor implements NestInterceptor {
    constructor(private formsService: FormsService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const { parentId } = req.session;
        if(parentId) {
            const form = await this.formsService.findOne(parentId);
            req.currentForm = form;
        }
        return handler.handle();
    }
}