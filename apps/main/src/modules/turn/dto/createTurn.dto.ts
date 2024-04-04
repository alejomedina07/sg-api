import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTurnDto {
  @ApiProperty({ description: 'id del turno', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({
    description: 'name del turno',
    required: true,
  })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del turno debe ser texto' })
  fullName: string;

  @ApiProperty({ description: 'document del turno', required: true })
  @IsDefined({ message: 'document: El documento es requerido' })
  @IsString({
    message: 'document: El description del turno debe ser texto',
  })
  document: string;

  @ApiProperty({ description: 'company del turno', required: true })
  @IsDefined({ message: 'company: La empresa es requerido' })
  @IsString({
    message: 'company: El description del turno debe ser texto',
  })
  company: string;

  @ApiProperty({ description: 'Hora del turno', required: false })
  @IsOptional()
  @IsString({
    message: 'timeAppointment: El description del turno debe ser texto',
  })
  timeAppointment?: string;

  @ApiProperty({ description: 'createdAt del turno', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({ description: 'createdAt del turno', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  finishAt?: Date;

  @ApiProperty({
    description: 'createdById del turno',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;

  @ApiProperty({
    description: 'Finalizado del turno',
    required: false,
  })
  @IsOptional()
  isFinish?: boolean;
}
