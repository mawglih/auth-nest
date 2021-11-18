import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService) {}
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request =  context.switchToHttp().getRequest();
        console.log('interceptor', request.session)
        const { userId } = request.session || {};
        console.log('interceptor2', userId)
        if(userId) {
            const user = await this.userService.findOne(userId);
            request.currentUser =  user;
        }
    return handler.handle();
    }
    
}