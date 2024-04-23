import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/role.enum';
import { PRIVILEGES_KEY, ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const requiredPrivileges = this.reflector.getAllAndOverride<string[]>(
      PRIVILEGES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles && !requiredPrivileges) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // Verificar privilegios
    let next = false;
    if (requiredRoles && requiredRoles.length > 0) {
      if (user?.rol && requiredRoles.some((role) => user.rol === role)) {
        next = true;
      }
    }
    console.log(7891, requiredPrivileges);
    if (requiredPrivileges && requiredPrivileges.length > 0) {
      const userPrivileges = user?.privileges || [];
      console.log(7891, userPrivileges);
      if (
        requiredPrivileges.some((privilege) =>
          userPrivileges.includes(privilege),
        )
      ) {
        next = true;
      }
      // if (
      //   requiredPrivileges.every((privilege) =>
      //     userPrivileges.includes(privilege),
      //   )
      // ) {
      //   next = true;
      // }
    }
    return next;
  }
}

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     console.log('User:::', user);
//     return requiredRoles.some((role) => user?.roles?.includes(role));
//   }
// }
