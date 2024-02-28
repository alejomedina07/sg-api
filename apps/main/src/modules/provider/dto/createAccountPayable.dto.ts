import {
  IsDate,
  IsDateString,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountPayableDto {
  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'description del lista', required: false })
  @IsOptional()
  @IsString({ message: 'description: El description del lista debe ser texto' })
  description?: string;

  @ApiProperty({ description: 'amount del lista', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsString({ message: 'amount: El amount del lista debe ser texto' })
  amount: string;

  @ApiProperty({ description: 'paid del lista', required: false })
  @IsOptional()
  paid?: boolean;

  @ApiProperty({ description: 'maxDateOfPay del lista', required: true })
  @IsDefined({ message: 'maxDateOfPay: El maxDateOfPay es requerido' })
  @IsDateString(
    {},
    { each: true, message: 'maxDateOfPay: La fecha no es correcta' },
  )
  maxDateOfPay: Date;

  @ApiProperty({ description: 'createdAt del lista', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'providerId del lista', required: true })
  @IsDefined({ message: 'providerId: El providerId es requerido' })
  @IsInt({ message: 'providerId: El providerId debe ser un número' })
  providerId: number;

  @ApiProperty({ description: 'reference del lista', required: false })
  @IsOptional()
  @IsString({ message: 'reference: El reference del lista debe ser texto' })
  reference?: string;
}
