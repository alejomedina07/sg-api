import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReassignAttentionDto {
  @ApiProperty({ description: 'id del turno', required: false })
  @IsDefined({ message: 'turnId: Las salas son requeridas' })
  @IsInt({ message: 'id: El id debe ser un número' })
  turnId?: number;

  @ApiProperty({ description: 'id del turno', required: false })
  @IsDefined({ message: 'newRoomId: Las salas son requeridas' })
  @IsInt({ message: 'id: El id debe ser un número' })
  newRoomId?: number;

  @ApiProperty({ description: 'id del turno', required: false })
  @IsDefined({ message: 'oldRoomId: Las salas son requeridas' })
  @IsInt({ message: 'id: El id debe ser un número' })
  oldRoomId?: number;
}
