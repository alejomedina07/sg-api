import { IsDefined, IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty }                                             from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ description: 'firstName del usuario', required: true })
  @IsDefined({ message: 'firstName: El nombre es requerido' })
  @IsString({ message: 'firstName: El nombre de usuario debe ser texto' })
  firstName: string;

  @ApiProperty({ description: 'lastName del usuario', required: true })
  @IsDefined({ message: 'lastName: El apellido es requerido' })
  @IsString({ message: 'lastName: El nombre de usuario debe ser texto' })
  lastName: string;

  @ApiProperty({ description: 'address del usuario', required: true })
  @IsDefined({ message: 'address: La dirección es requerido' })
  @IsString({ message: 'address: El nombre de usuario debe ser texto' })
  address: string;

  @ApiProperty({ description: 'phoneNumber del usuario', required: true })
  @IsDefined({ message: 'phoneNumber: El número de teléfono es requerido' })
  @IsString({ message: 'phoneNumber: El nombre de usuario debe ser texto' })
  phoneNumber: string;

  @ApiProperty({ description: 'bloodType del usuario', required: false })
  @IsDefined({ message: 'bloodType: El número de teléfono es requerido' })
  @IsString({ message: 'bloodType: El nombre de usuario debe ser texto' })
  bloodType?: string | null;

  @ApiProperty({ description: 'email del usuario', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'email: El email no es correcto!' })
  email?: string;

  @ApiProperty({ description: 'documentTypeId del usuario', required: true })
  @IsOptional()
  @IsInt({ message: 'documentTypeId: El tipo de documento debe ser un número' })
  documentTypeId: number;

  @ApiProperty({ description: 'documentNumber del usuario', required: true })
  @IsDefined({ message: 'documentNumber: El número de documento es requerido' })
  @IsString({ message: 'documentNumber: El número de documento de usuario debe ser texto' })
  documentNumber: string;

  @ApiProperty({ description: 'rolId del usuario', required: true })
  @IsDefined({ message: 'rolId: El rol es requerido' })
  @IsInt({ message: 'rolId: El rol debe ser un número' })
  rolId: number;

  @ApiProperty({ description: 'password del usuario', required: true })
  @IsOptional()
  @IsString({ message: 'password: La contraseña del usuario debe ser texto' })
  password: string;

  @ApiProperty({ description: 'statusId del usuario', required: true })
  @IsDefined({ message: 'statusId: El estado de documento es requerido' })
  @IsInt({ message: 'statusId: El estado debe ser un número' })
  statusId: number;

}
