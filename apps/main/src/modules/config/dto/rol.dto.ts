import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RolDto {
  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name del lista', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del lista debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del lista', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({ message: 'description: El description del lista debe ser texto' })
  description: string;

  @ApiProperty({ description: 'status de la cita', required: false })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class RolPermissionDto {
  @ApiProperty({
    type: [Number],
    description: 'permissionsId del lista',
    required: true,
  })
  @IsDefined({ message: 'permissionsId: El permissionsId es requerido' })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  permissionsId: number[];

  @ApiProperty({
    type: [Number],
    description: 'permissionsId del lista',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  privilegesId: number[];

  @ApiProperty({ description: 'rol del lista', required: true })
  @IsDefined({ message: 'rol: El rol es requerido' })
  rol: RolDto;
}
