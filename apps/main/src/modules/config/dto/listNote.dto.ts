import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class ListNoteDto {
  @ApiProperty({ description: 'key del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  page?: number;

  @ApiProperty({ description: 'key del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  limit?: number;

  @ApiProperty({ description: 'entityType del usuario', required: true })
  @IsDefined({ message: 'entityType: El entityType es requerido' })
  @IsString({ message: 'entityType: El entityType de usuario debe ser texto' })
  entityType: string;

  @ApiProperty({ description: 'id del cliente', required: true })
  @IsDefined({ message: 'id: El id es requerido' })
  @IsString({ message: 'id: El id debe ser texto' })
  entityId: number;
}
