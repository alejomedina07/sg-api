import { SetMetadata } from '@nestjs/common';
import { Privilege, Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const PRIVILEGES_KEY = 'privileges';
export const Privileges = (...privileges: Privilege[]) =>
  SetMetadata(PRIVILEGES_KEY, privileges);
