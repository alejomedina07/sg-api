import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { Transform, Type } from 'class-transformer';

enum TYPES {
  AND = 'AND',
}

export class AttentionFilters {
  @ApiProperty({ description: 'ID del elemento', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El ID debe ser un número' })
  @Transform(({ value }) => {
    return Number(value);
  })
  id?: number;

  @ApiProperty({ description: 'ID del proveedor', required: false })
  @IsOptional()
  @IsInt({ message: 'providerId: El ID del proveedor debe ser un número' })
  @Transform(({ value }) => {
    return Number(value);
  })
  typeTurnId?: number;

  @ApiProperty({ description: 'Descripción del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'description: La descripción debe ser texto' })
  fullName?: string;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'amount: La cantidad debe ser texto' })
  document?: string;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'provider: El provider debe ser texto' })
  company?: string;

  @ApiProperty({ description: 'Indica si está pagado', required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isFinish?: boolean;

  @ApiProperty({ description: 'ID del elemento', required: false })
  @IsOptional()
  @IsEnum(TYPES, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  type?: TYPES;
}

enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class AttentionOrder {
  @ApiProperty({ description: 'ID del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'id: El orden debe ser "asc" o "desc"',
  })
  id?: OrderDirection;

  @ApiProperty({ description: 'ID del proveedor', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'createdById: El orden debe ser "asc" o "desc"',
  })
  createdById?: OrderDirection;

  @ApiProperty({ description: 'ID del proveedor', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'createdById: El orden debe ser "asc" o "desc"',
  })
  typeTurnId?: OrderDirection;

  @ApiProperty({ description: 'Descripción del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'fullName: El orden debe ser "asc" o "desc"',
  })
  fullName?: OrderDirection;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'document: El orden debe ser "asc" o "desc"',
  })
  document?: OrderDirection;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'company: El orden debe ser "asc" o "desc"',
  })
  company?: OrderDirection;

  @ApiProperty({ description: 'Indica si está pagado', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'isFinish: El orden debe ser "asc" o "desc"',
  })
  isFinish?: OrderDirection;
}

export class GetAttentionDto extends PaginationDto {
  @ApiProperty({ description: 'Filtros para la consulta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttentionFilters)
  filters?: AttentionFilters;

  @ApiProperty({ description: 'Filtros para la consulta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AttentionOrder)
  order?: AttentionOrder;
}
