import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsNumber,
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

  @ApiProperty({ description: 'Salas del turno', required: true })
  @IsDefined({ message: 'typeTurns: Las salas son requeridas' })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  typeTurns: number[];

  @ApiProperty({ description: 'Hora del turno', required: false })
  @IsOptional()
  @IsString({
    message: 'timeAppointment: El description del turno debe ser texto',
  })
  timeAppointment?: string;

  @ApiProperty({ description: 'Nota del turno', required: false })
  @IsOptional()
  @IsString({
    message: 'note: La nota del turno debe ser texto',
  })
  note?: string;

  @ApiProperty({ description: 'Hora de entrada del paciente', required: false })
  @IsOptional()
  @IsString({
    message: 'entryTime: La hora de entrada debe ser texto',
  })
  entryTime?: string;

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

  @ApiProperty({
    description: 'Doble turno',
    required: false,
  })
  @IsOptional()
  doubleTurn?: boolean;
}
