import { ApiProperty }             from '@nestjs/swagger';
import { IsDateString, IsDefined } from 'class-validator';

export class AppointmentParamsDto {


  @ApiProperty({ description: 'Inicio de fecha', required: false, type: Date, default: new Date() })
  @IsDefined({ message: 'start: El inicio es requerido' })
  @IsDateString({}, { each: true, message: 'start: La fecha no es correcta' })
  start: Date;

  @ApiProperty({ description: 'Fin de fecha', required: false })
  @IsDefined({ message: 'end: El fin es requerido' })
  @IsDateString({}, { each: true, message: 'end: La fecha no es correcta' })
  end: Date;
}

// export class Range {
//   @ApiProperty({ description: 'Inicio de fecha', required: true })
//   @IsDefined({ message: 'start: El inicio es requerido' })
//   @IsDateString({}, { each: true, message: 'date: La fecha no es correcta' })
//   start: Date;
//
//   @ApiProperty({ description: 'Fin de fecha', required: true })
//   @IsDefined({ message: 'end: El fin es requerido' })
//   @IsDateString({}, { each: true, message: 'date: La fecha no es correcta' })
//   end: Date;
// }