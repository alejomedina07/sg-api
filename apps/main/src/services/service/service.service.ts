import { Injectable } from '@nestjs/common';
import { ResponseDto } from "../../dto/shared/response.dto";
import { ServiceRepository } from "sg/core/repositories/service/service.repository";
import { CreateServiceDto } from "../../dto/service/createService.dto";

@Injectable()
export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {
  }

  async getService(): Promise<ResponseDto> {
    return await this.serviceRepository.getServices()
  }

  async createService(data: CreateServiceDto): Promise<ResponseDto> {
    return await this.serviceRepository.createService(data);
  }
}
