import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttentionDto {
  @ApiProperty({ description: 'id del turno', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'document del turno', required: false })
  @IsOptional()
  @IsString({
    message: 'description: La description del turno debe ser texto',
  })
  description?: string;

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
    required: true,
  })
  @IsDefined({ message: 'attentById: Atendido por es requerido' })
  @IsInt({ message: 'attentById: Atendido por debe ser un número' })
  attentById: number;

  @ApiProperty({
    description: 'createdById del turno',
    required: true,
  })
  @IsDefined({ message: 'turnId: El turno es requerido' })
  @IsInt({ message: 'turnId: El turno debe ser un número' })
  turnId: number;

  @ApiProperty({
    description: 'createdById del turno',
    required: true,
  })
  @IsDefined({ message: 'typeTurnId: El tipo de turno es requerido' })
  @IsInt({ message: 'typeTurnId: El tipo de turno debe ser un número' })
  typeTurnId: number;

  @ApiProperty({ description: 'Finalización del turno', required: false })
  @IsOptional()
  @IsBoolean()
  isFinish?: boolean;
}
