import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ServiceAppointment {
  @ApiProperty({ description: 'amount del Servicio', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'description del Servicio', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'typeId del Servicio', required: true })
  @IsDefined({ message: 'typeId: El typeId es requerido' })
  @IsNumber()
  typeId: number;

  @ApiProperty({ description: 'statusId del Servicio', required: true })
  @IsDefined({ message: 'statusId: El statusId es requerido' })
  @IsNumber()
  statusId: number;
}

export class CreateAppointmentDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'date del cliente', required: true })
  @IsDefined({ message: 'date: El date es requerido' })
  @IsDateString({}, { each: true, message: 'date: La fecha no es correcta' })
  date: Date;

  @ApiProperty({ description: 'duration del cliente', required: true })
  @IsDefined({ message: 'duration: El duration es requerido' })
  @IsInt({ message: 'duration: El duration debe ser un número' })
  duration: number;

  @ApiProperty({ description: 'name del cliente', required: false })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del cliente', required: false })
  @IsOptional()
  @IsString({
    message: 'description: El description del cliente debe ser texto',
  })
  description?: string | null;

  @ApiProperty({ description: 'customerId del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'customerId: El customerId debe ser un número' })
  customerId?: number | null;

  @ApiProperty({ description: 'appointmentTypeId de la cita', required: false })
  @IsOptional()
  @IsInt({
    message: 'appointmentTypeId: El appointmentTypeId debe ser un número',
  })
  appointmentTypeId?: number | null;

  @ApiProperty({ description: 'userId del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'userId: El userId debe ser un número' })
  createdById?: number | null;

  @ApiProperty({ description: 'addService de la cita', required: false })
  @IsOptional()
  @IsBoolean()
  addService: boolean;

  @ApiProperty({ description: 'Service de la cita', required: false })
  @IsOptional()
  @ValidateIf((o) => o.addService) // Only validate service if addService is true
  @ValidateNested()
  @Type(() => ServiceAppointment)
  service?: ServiceAppointment; // Optional property

  @ApiProperty({ description: 'assignedToId del usuario', required: true })
  @IsDefined({ message: 'assignedToId: Asignar es requerido' })
  @IsInt({ message: 'assignedToId: Asignar debe ser un número' })
  assignedToId: number;
}
