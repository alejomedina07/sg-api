import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'title de la nota', required: true })
  @IsDefined({ message: 'title: El title es requerido' })
  @IsString({ message: 'title: El title de la nota debe ser texto' })
  title: string;

  @ApiProperty({ description: 'description de la nota', required: true })
  @IsDefined({ message: 'description: La description es requerido' })
  @IsString({
    message: 'description: La description de la nota debe ser texto',
  })
  description: string;

  @ApiProperty({ description: 'key de la nota', required: true })
  @IsDefined({ message: 'key: La key es requerido' })
  @IsString({
    message: 'entityType: La entityType de la nota debe ser texto',
  })
  entityType: string;

  @ApiProperty({ description: 'entityId de la nota', required: false })
  @IsDefined({ message: 'entityId: La entityId es requerido' })
  @IsInt({ message: 'entityId: El entityId debe ser un número' })
  entityId: number;
}
