import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/dto/shared/response.dto';

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

  async getServices(): Promise<ResponseDto> {
    try {
      return {
        data: await this.serviceRepository.manager.find(Service, {
          relations: ['status', 'type'],
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getServicesReport(): Promise<ResponseDto> {
    try {
      return {
        data: await this.serviceRepository.manager.find(Service, {
          relations: ['status', 'type'],
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getReportServices(): Promise<ResponseDto> {
    try {
      const queryService = `
          SELECT
              TO_CHAR(date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS name,
              CAST(COUNT(*) AS INTEGER) AS count,
              SUM(amount) AS totalAmount
          FROM "SVC".service
          group by name
          ORDER BY name`;

      const queryExpense = `
          SELECT
              TO_CHAR(date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS name,
              CAST(COUNT(*) AS INTEGER) AS count,
              SUM(amount) AS totalAmount
          FROM "INV".expense
          GROUP BY date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota')
          ORDER BY name`;

      const resultService = await this.serviceRepository.query(queryService);
      const resultExpense = await this.serviceRepository.query(queryExpense);
      console.log(78, resultExpense);
      const dataExpense = resultExpense.map(({ name, totalamount, count }) => ({
        name,
        count,
        totalAmount:
          parseInt(String(totalamount.replace(/[$,]/g, '') * 100)) / 100,
      }));

      const dataService = resultService.map(({ name, totalamount, count }) => ({
        name,
        count,
        totalAmount:
          parseInt(String(totalamount.replace(/[$,]/g, '') * 100)) / 100,
      }));
      const data = { dataService, dataExpense };
      console.log(data);
      return { data, code: 201, msg: 'Obtenido correctamente' };
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' };
    }
  }
}

// Hello Florencia, thanks for contact me, currently I am b1 in English Level, I am interested in hearing more about the offer
