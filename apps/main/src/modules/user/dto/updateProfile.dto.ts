import {
  IsDefined,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ description: 'address del usuario', required: true })
  @IsDefined({ message: 'address: La dirección es requerido' })
  @IsString({ message: 'address: La dirección de usuario debe ser texto' })
  address: string;

  @ApiProperty({ description: 'phoneNumber del usuario', required: true })
  @IsDefined({ message: 'phoneNumber: El número de teléfono es requerido' })
  @IsString({
    message: 'phoneNumber: El número de teléfono de usuario debe ser texto',
  })
  phoneNumber: string;

  @ApiProperty({ description: 'password del usuario', required: true })
  @IsDefined({ message: 'password: La contraseña es requerido' })
  @IsString({ message: 'password: La contraseña del usuario debe ser texto' })
  password: string;

  @ApiProperty({ description: 'password del usuario', required: true })
  @IsDefined({ message: 'phoneNumber: La contraseña es requerido' })
  @IsString({ message: 'password: La contraseña del usuario debe ser texto' })
  confirmPassword: string;

  @ApiProperty({ description: 'createdById del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El createdById debe ser un número' })
  createdById?: number;
}
