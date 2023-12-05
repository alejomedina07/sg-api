import { Injectable } from '@nestjs/common';
import { RolRepository } from 'sg/core/repositories/config/rol.repository';
import { PrivilegesPermissionsDto } from '../../dto/permission.dto';
import { ResponseDto } from '../../../../shared/dto/response.dto';

@Injectable()
export class PermissionService {
  constructor(private rolRepository: RolRepository) {}

  async createPermission(data: PrivilegesPermissionsDto): Promise<ResponseDto> {
    return this.rolRepository.createPermission(data);
  }
  async getPermission(): Promise<ResponseDto> {
    return this.rolRepository.getPermission();
  }
  async getPrivileges(): Promise<ResponseDto> {
    return this.rolRepository.getPrivileges();
  }
}
