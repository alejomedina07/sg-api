import { User } from "sg/core/entities";
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateLoginDto {
  @ApiProperty({ description: 'phoneNumber del usuario', required: true })
  @IsDefined({ message: 'phoneNumber: El email es requerido' })
  @IsString({ message: 'phoneNumber: El email no es correcto!' })
  phoneNumber: string;

  @ApiProperty({ description: 'password del usuario', required: true })
  @IsDefined({ message: 'password: La contraseña es requerido' })
  @IsString({ message: 'password: La contraseña del usuario debe ser texto' })
  password: string
}

export class ResponseLogin {
  user?: User;
  token?: string;
  msg: string;
}
