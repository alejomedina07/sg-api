import { Injectable } from '@nestjs/common';
import { RolRepository } from 'sg/core/repositories/config/rol.repository';
import { ResponseDto } from '../../../dto/shared/response.dto';
import { RolPermissionDto } from '../../dto/rol.dto';

@Injectable()
export class RolService {
  constructor(private rolRepository: RolRepository) {}

  async createRol(data: RolPermissionDto): Promise<ResponseDto> {
    return this.rolRepository.createRol(data);
  }

  async getRol(): Promise<ResponseDto> {
    return this.rolRepository.getRol();
  }
}
