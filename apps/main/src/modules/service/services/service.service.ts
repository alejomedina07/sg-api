import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { ServiceRepository } from 'sg/core/repositories/service/service.repository';
import { CreateServiceDto } from '../dto/createService.dto';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
@Injectable()
export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {}

  async getService(params: PaginationDto): Promise<ResponseDto> {
    return await this.serviceRepository.getServices(params);
  }

  async createService(data: CreateServiceDto): Promise<ResponseDto> {
    return await this.serviceRepository.createService(data);
  }

  async updateService(
    id: number,
    data: CreateServiceDto,
  ): Promise<ResponseDto> {
    return await this.serviceRepository.updateService(id, data);
  }
}
