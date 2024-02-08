import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AppointmentParamsDto {
  @ApiProperty({
    description: 'Inicio de fecha',
    required: true,
    type: Date,
    default: new Date(),
  })
  @IsDefined({ message: 'start: El inicio es requerido' })
  @IsDateString({}, { each: true, message: 'start: La fecha no es correcta' })
  start: Date;

  @ApiProperty({ description: 'Fin de fecha', required: true })
  @IsDefined({ message: 'end: El fin es requerido' })
  @IsDateString({}, { each: true, message: 'end: La fecha no es correcta' })
  end: Date;

  @ApiProperty({ description: 'Usuario', required: true })
  @IsDefined({ message: 'idUser: El fin es requerido' })
  // @IsNumber({}, { message: 'idUser: El idUser no es correcto' })
  @IsInt({ message: 'idUser: El idUser no es correcto' })
  @Type(() => Number)
  idUser: number;
}
