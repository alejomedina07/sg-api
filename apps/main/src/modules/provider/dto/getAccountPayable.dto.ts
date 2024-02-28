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

export class AccountPayableFilters {
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
  providerId?: number;

  @ApiProperty({ description: 'Descripción del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'description: La descripción debe ser texto' })
  description?: string;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'amount: La cantidad debe ser texto' })
  amount?: string;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsString({ message: 'provider: El provider debe ser texto' })
  provider?: string;

  @ApiProperty({ description: 'Indica si está pagado', required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  paid?: boolean;

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

export class AccountPayableOrder {
  @ApiProperty({ description: 'ID del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  id?: OrderDirection;

  @ApiProperty({ description: 'ID del proveedor', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  providerId?: OrderDirection;

  @ApiProperty({ description: 'Descripción del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  description?: OrderDirection;

  @ApiProperty({ description: 'Cantidad del elemento', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  amount?: OrderDirection;

  @ApiProperty({ description: 'Indica si está pagado', required: false })
  @IsOptional()
  @IsEnum(OrderDirection, {
    message: 'providerId: El orden debe ser "asc" o "desc"',
  })
  paid?: OrderDirection;
}

export class GetAccountPayableDto extends PaginationDto {
  @ApiProperty({ description: 'Filtros para la consulta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountPayableFilters)
  filters?: AccountPayableFilters;

  @ApiProperty({ description: 'Filtros para la consulta', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountPayableOrder)
  order?: AccountPayableOrder;
}
