import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from 'sg/core/repositories/appointment/appointment.repository';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateAppointmentDto } from '../dto/createAppointment.dto';
import { CreateAppointmentTypeDto } from '../dto/createAppointmentType.dto';
import { AppointmentParamsDto } from '../dto/AppointmentParams.dto';

@Injectable()
export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async getAppointments(range: AppointmentParamsDto): Promise<ResponseDto> {
    return this.appointmentRepository.getAppointments(range);
  }

  async createAppointment(data: CreateAppointmentDto): Promise<ResponseDto> {
    return this.appointmentRepository.createAppointment(data);
  }

  async updateAppointment(
    id: number,
    data: CreateAppointmentDto,
  ): Promise<ResponseDto> {
    return this.appointmentRepository.updateAppointment(id, data);
  }

  async getAppointmentTypes(getAll: boolean): Promise<ResponseDto> {
    return this.appointmentRepository.getAppointmentTypes(getAll);
  }

  async updateAppointmentType(
    id: number,
    data: CreateAppointmentTypeDto,
  ): Promise<ResponseDto> {
    return this.appointmentRepository.updateAppointmentType(id, data);
  }

  async createAppointmentType(
    data: CreateAppointmentTypeDto,
  ): Promise<ResponseDto> {
    return this.appointmentRepository.createAppointmentType(data);
  }
}
