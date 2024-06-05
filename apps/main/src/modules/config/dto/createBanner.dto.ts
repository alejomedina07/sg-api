import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  // @IsInt({ message: 'id: El id debe ser un número' })
  @IsNumberString({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name del banner', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del banner debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del banner', required: true })
  @IsDefined({ message: 'description: La description es requerida' })
  @IsString({
    message: 'description: La description del banner debe ser texto',
  })
  description: string;

  @ApiProperty({ description: 'photo del banner', required: true })
  @IsOptional()
  @IsString({
    message: 'photo: La photo del banner debe ser texto',
  })
  photo?: string;

  @ApiProperty({ description: 'status del lista', required: false })
  @IsOptional()
  status?: boolean;
}
