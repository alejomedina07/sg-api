import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityManager, FindManyOptions, Repository } from 'typeorm';
import {
  Appointment,
  AppointmentType,
  Inventory,
  InventoryInOut,
  Service,
} from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { AppointmentParamsDto } from '../../../../../apps/main/src/modules/appointment/dto/AppointmentParams.dto';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly entityManager: EntityManager,
  ) {}

  getService(data: Appointment, appointmentId: number): Service {
    return {
      ...data.service,
      appointmentId,
      customerId: data.customerId,
      createdById: data.createdById,
    };
  }

  async createAppointment(data: Appointment): Promise<ResponseDto> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const resAppointment = await entityManager.insert(Appointment, data);
        if (data.service) {
          const dataService: Service = this.getService(
            data,
            resAppointment.identifiers[0].id,
          );
          await entityManager.insert(Service, dataService);
        }
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateAppointment(id: number, data: Appointment): Promise<ResponseDto> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const dataAux = { ...data };
        delete data.service;
        await entityManager.update(Appointment, id, data);
        const serviceAppointment = await entityManager.findOne(Service, {
          where: { appointmentId: id },
        });
        console.log(8, serviceAppointment);
        console.log(dataAux);
        if (dataAux.service && !serviceAppointment) {
          const dataService: Service = this.getService(dataAux, id);
          console.log(777, dataService);
          await entityManager.insert(Service, dataService);
        }
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getAppointments({
    start,
    end,
  }: AppointmentParamsDto): Promise<ResponseDto> {
    try {
      const [data, total] =
        await this.appointmentRepository.manager.findAndCount(Appointment, {
          relations: ['appointmentType', 'customer', 'service'],
          where: {
            date: Between(start, end),
          },
        });

      return {
        data,
        total,
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener', data: e };
    }
  }

  async createAppointmentType(data: AppointmentType): Promise<ResponseDto> {
    try {
      const appointmentInsert = await this.appointmentRepository.manager.insert(
        AppointmentType,
        data,
      );
      return {
        data: appointmentInsert.identifiers[0].id,
        msg: 'Tipo de Cita Creada exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(999, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }
  async updateAppointmentType(
    id: number,
    data: AppointmentType,
  ): Promise<ResponseDto> {
    try {
      const appointmentInsert = await this.appointmentRepository.manager.update(
        AppointmentType,
        id,
        data,
      );
      // await this.appointmentRepository.manager.update();

      return {
        data: appointmentInsert,
        msg: 'Tipo de Cita Creada exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(999, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getAppointmentTypes(getAll?: boolean): Promise<ResponseDto> {
    try {
      let options: FindManyOptions = {
        order: { name: 'ASC' },
        where: { status: true },
      };
      if (getAll) delete options.where;

      console.log(1111, options);

      return {
        data: await this.appointmentRepository.manager.find(
          AppointmentType,
          options,
        ),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
