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

  async updateService(id: number, data: Service): Promise<any> {
    try {
      const serviceInsert = await this.serviceRepository.update(id, data);
      return { data: serviceInsert.raw, msg: 'Servicio creado exitosamente!', code: 200 }
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

  async getReportServices(): Promise<ResponseDto> {
    try {
      const query = `
        SELECT 
          to_char(DATE_TRUNC('month', created_at), 'YYYY-MM') as month,
          CAST(COUNT(*) AS INTEGER) AS count,
          SUM(amount) as total_amount
        FROM
            "SVC".service
        GROUP BY 
          month
        ORDER BY 
          month
      `;
      const result = await this.serviceRepository.query(query);
      const data = result.map(({ month, total_amount, count }) => (
        {
          name:month,  count,
          total_amount:  (parseInt(String( total_amount.replace( /[$,]/g, '' ) * 100 ))) / 100
        }
      ));
      console.log(data);
      return { data, code: 201, msg: 'Obtenido correctamente' }
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' }
    }
  }

}
