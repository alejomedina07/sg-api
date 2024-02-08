import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'id de la categoría', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name de la categoría', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name de la categoría debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description de la categoría', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({
    message: 'description: El description de la categoría debe ser texto',
  })
  description: string | null;

  @ApiProperty({ description: 'estado de la categoría', required: false })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
