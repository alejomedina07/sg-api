import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProcedureDto {
  @ApiProperty({ description: 'id del procedimiento', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({
    description: 'name del procedimiento',
    required: true,
  })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del procedimiento debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del procedimiento', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({
    message: 'description: El description del procedimiento debe ser texto',
  })
  description: string;

  @ApiProperty({ description: 'createdAt del procedimiento', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({
    description: 'status del procedimiento',
    required: true,
  })
  @IsDefined({ message: 'status: El status es requerido' })
  status: boolean;

  @ApiProperty({
    description: 'createdById del procedimiento',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'parent del procedimiento', required: false })
  @IsDefined({ message: 'parent: El campo es requerido' })
  parent: boolean;
}
