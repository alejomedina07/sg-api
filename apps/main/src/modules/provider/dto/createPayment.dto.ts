import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'amount del pago', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsInt({ message: 'amount: El amount debe ser un número' })
  amount: number;

  @ApiProperty({ description: 'description del lista', required: false })
  @IsOptional()
  @IsString({ message: 'description: El description del lista debe ser texto' })
  description?: string;

  @ApiProperty({ description: 'paymentDate del lista', required: true })
  @IsDefined({ message: 'paymentDate: El paymentDate es requerido' })
  @IsDate({ message: 'paymentDate: La fecha no es correcta' })
  paymentDate: Date;

  @ApiProperty({ description: 'reference del lista', required: false })
  @IsOptional()
  @IsString({ message: 'reference: El reference del lista debe ser texto' })
  reference?: string;

  @ApiProperty({ description: 'method del lista', required: true })
  @IsDefined({ message: 'method: El method es requerido' })
  @IsString({ message: 'method: El method del lista debe ser texto' })
  method: string;

  @ApiProperty({ description: 'createdAt del lista', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;
}

export class AccountsPayableDto {
  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsDefined({ message: 'accountPayableId: El accountPayableId es requerido' })
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  accountPayableId: number;

  @ApiProperty({ description: 'amount del cliente', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsInt({ message: 'amount: El amount debe ser un número' })
  amount: number;
}

export class CreatePaymentDto {
  @ApiProperty({ type: PaymentDto, description: 'Pago', required: true })
  @IsDefined({ message: 'payment: El Pago es requerido' })
  payment: PaymentDto;

  @ApiProperty({
    type: [AccountsPayableDto],
    description: 'Pago',
    required: true,
  })
  @IsDefined({ message: 'accountsPayable: El Pago es requerido' })
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, {
    message: 'accountsPayable: Al menos un objeto es requerido',
  })
  accountsPayable: AccountsPayableDto[];

  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;
}
