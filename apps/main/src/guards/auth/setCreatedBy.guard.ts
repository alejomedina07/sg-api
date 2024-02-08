import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SetCreatedByGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user, body } = context.switchToHttp().getRequest();
    console.log('user::', body);
    body.createdById = user.id;
    console.log('user::', body);
    return true;
  }
}
