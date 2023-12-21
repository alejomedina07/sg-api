import { Injectable } from '@nestjs/common';
import { Appointment, Service } from 'sg/core/entities';
import { Between, EntityManager } from 'typeorm';

@Injectable()
export class AppointmentSourceService {
  async isAppointmentTimeSlotAvailable(
    entityManager: EntityManager,
    date: Date,
    duration: number,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const existingAppointment = await entityManager.findOne(Appointment, {
      where: {
        date: Between(startDate, endDate),
      },
    });

    console.log(789, existingAppointment);

    if (existingAppointment) {
      // Verificar si hay conflicto de horarios
      const existingEndTime = new Date(
        existingAppointment.date.getTime() +
          existingAppointment.duration * 60000,
      );
      const newEndTime = new Date(date.getTime() + duration * 60000);

      if (date < existingEndTime && newEndTime > existingAppointment.date) {
        // Existe conflicto de horarios
        return false;
      }
    }

    return true;
  }

  getService(data: Appointment, appointmentId: number): Service {
    return {
      ...data.service,
      appointmentId,
      customerId: data.customerId,
      createdById: data.createdById,
    };
  }
}
