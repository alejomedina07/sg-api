import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SetCreatedByGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const { user, body } = context.switchToHttp().getRequest();
    body.createdById = user.id;
    return true;
  }
}
