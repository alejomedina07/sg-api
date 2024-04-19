import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeTurnDto {
  @ApiProperty({ description: 'id de la sale', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({
    description: 'name de la sale',
    required: true,
  })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name de la sale debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description de la sale', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({
    message: 'description: El description de la sale debe ser texto',
  })
  description: string;

  @ApiProperty({ description: 'createdAt de la sale', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({
    description: 'status de la sale',
    required: true,
  })
  @IsDefined({ message: 'status: El status es requerido' })
  status: boolean;

  @ApiProperty({
    description: 'createdById de la sale',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'Tipo de turno de la sale', required: true })
  @IsDefined({ message: 'typeTurnId: El tipo de turno es requerido.' })
  @IsInt({ message: 'id: El id debe ser un número' })
  typeTurnId: number;
}
