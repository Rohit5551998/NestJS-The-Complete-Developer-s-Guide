import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return (request.currentUser ? request.currentUser.admin : false);
    // Equivalent to below code
    // if (!request.CurrentUser) {
    //   return false;
    // }

    // return request.CurrentUser.admin;
  }
}