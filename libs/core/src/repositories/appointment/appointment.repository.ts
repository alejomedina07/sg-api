import { Injectable }                   from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { Between, Repository }          from 'typeorm';
import { Appointment, AppointmentType } from "sg/core/entities";
import { ResponseDto }                  from "../../../../../apps/main/src/dto/shared/response.dto";
import { AppointmentParamsDto }         from '../../../../../apps/main/src/dto/appointment/AppointmentParams.dto';

@Injectable()
export class AppointmentRepository {
  constructor(@InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>) {}

  async createAppointment(data: Appointment): Promise<ResponseDto> {
    try {
      const appointmentInsert = await this.appointmentRepository.manager.insert(Appointment, data);
      return { data: appointmentInsert.identifiers[0].id, msg: 'Cita Creada exitosamente!', code: 200 }
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getAppointments( { start, end }: AppointmentParamsDto): Promise<ResponseDto> {
    try {
      console.log('Repository:: ', { start, end });
      const [data, total] = await this.appointmentRepository.manager.findAndCount( Appointment, {
        relations:['appointmentType', 'customer'],
        where: {
          date: Between(start, end),
        },
      })

      return {
        data, total,
        msg: 'Obtenido correctamente!', code: 201
      }
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener', data: e }
    }
  }

  async createAppointmentType(data: AppointmentType): Promise<ResponseDto> {
    try {
      const appointmentInsert = await this.appointmentRepository.manager.insert(AppointmentType, data);
      return { data: appointmentInsert.identifiers[0].id, msg: 'Tipo de Cita Creada exitosamente!', code: 200 }
    } catch (e) {
      console.log(999, e);
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getAppointmentTypes(): Promise<ResponseDto> {
    try {
      return { data: await this.appointmentRepository.manager.find( AppointmentType ), msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' }
    }
  }
}
