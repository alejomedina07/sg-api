import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { PaginationDto } from '../../../../../apps/main/src/shared/dto/pagination.dto';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  async createService(data: Service): Promise<any> {
    try {
      const serviceInsert = await this.serviceRepository.manager.insert(
        Service,
        data,
      );
      return {
        data: serviceInsert.identifiers[0].id,
        msg: 'Servicio creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateService(id: number, data: Service): Promise<any> {
    try {
      const serviceInsert = await this.serviceRepository.update(id, data);
      return {
        data: serviceInsert.raw,
        msg: 'Servicio creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getServices(params: PaginationDto): Promise<ResponseDto> {
    try {
      const { page, limit } = params;
      const [data, total] = await this.serviceRepository.manager.findAndCount(
        Service,
        {
          relations: ['status', 'type'],
          order: { id: 'desc' },
          skip: (page - 1) * limit || 0,
          take: limit || 1000,
        },
      );
      return {
        data,
        total,
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
