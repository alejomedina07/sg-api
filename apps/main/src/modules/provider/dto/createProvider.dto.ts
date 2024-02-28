import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;
  @ApiProperty({ description: 'name del lista', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del lista debe ser texto' })
  name: string;

  @ApiProperty({ description: 'phoneNumber del lista', required: true })
  @IsDefined({ message: 'phoneNumber: El phoneNumber es requerido' })
  @IsString({ message: 'phoneNumber: El phoneNumber del lista debe ser texto' })
  phoneNumber: string;

  @ApiProperty({ description: 'address del lista', required: false })
  @IsOptional()
  @IsString({ message: 'address: El address del lista debe ser texto' })
  address?: string;

  @ApiProperty({ description: 'email del lista', required: true })
  @IsDefined({ message: 'email: El email es requerido' })
  @IsString({ message: 'email: El email del lista debe ser texto' })
  email: string;
  @ApiProperty({ description: 'document del lista', required: true })
  @IsDefined({ message: 'document: El document es requerido' })
  @IsString({ message: 'document: El document del lista debe ser texto' })
  document: string;
  @ApiProperty({ description: 'status del lista', required: true })
  @IsDefined({ message: 'status: El status es requerido' })
  status: boolean;

  @ApiProperty({ description: 'createdAt del lista', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?: Date;

  @ApiProperty({ description: 'documentTypeId del lista', required: true })
  @IsDefined({ message: 'documentTypeId: El documentTypeId es requerido' })
  @IsInt({ message: 'documentTypeId: El documentTypeId debe ser un número' })
  documentTypeId: number;

  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;
}
