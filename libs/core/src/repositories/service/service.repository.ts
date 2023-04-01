import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from "sg/core/entities";
import { ResponseDto } from "../../../../../apps/main/src/dto/shared/response.dto";

@Injectable()
export class ServiceRepository {
  constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>) {}

  async createService(data: Service): Promise<any> {
    try {
      const serviceInsert = await this.serviceRepository.manager.insert(Service, data);
      return { data: serviceInsert.identifiers[0].id, msg: 'Servicio creado exitosamente!', code: 200 }
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getServices(): Promise<ResponseDto> {
    try {
      return { data: await this.serviceRepository.manager.find( Service, { relations:['status'] } ), msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' }
    }
  }
}
