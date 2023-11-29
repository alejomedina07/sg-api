import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentRepository } from 'sg/core/repositories/appointment/appointment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'sg/core/entities';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}
