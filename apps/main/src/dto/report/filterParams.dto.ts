import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidMonthYearConstraint } from './ValidMonthYearConstraint.dto';

enum QueryType {
  CURRENT_MONTH = 'current_month',
  MONTH = 'month',
  RANGE = 'range',
}

export class FilterParamsDto {
  @ApiProperty({ description: 'Tipo de filtro', required: true })
  @IsEnum(QueryType, { message: 'type: El tipo no es correcto' })
  type: QueryType;

  @ApiProperty({ description: 'Mes en el filtro', required: false })
  @ValidateIf((o, value) => o.type === 'month')
  @Matches(/^\d{4}-\d{2}$/, {
    message: 'month: Formato invalido, el formato debe ser YYYY-mm.',
  })
  @Validate(ValidMonthYearConstraint, {
    message: 'month: El mes o el año es invalido',
  })
  month: string;

  // @IsString({ message: 'month: El mes es requerido' })
  // @IsNotEmpty({ message: 'month: El mes no puede estar vacio' })
  // month: string;

  @ApiProperty({ description: 'Fecha de inicio', required: false })
  @ValidateIf((o, value) => o.type === 'range')
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({ description: 'Fecha de fin', required: false })
  @ValidateIf((o, value) => o.type === 'range')
  @IsDateString()
  @IsNotEmpty()
  end_date: string;
}
