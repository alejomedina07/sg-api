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

  @ApiProperty({ description: 'key del usuario', required: true })
  @IsDefined({ message: 'key: El key es requerido' })
  @IsString({ message: 'key: El key de usuario debe ser texto' })
  key: string;

  @ApiProperty({ description: 'id del cliente', required: true })
  @IsDefined({ message: 'id: El id es requerido' })
  @IsString({ message: 'id: El id debe ser texto' })
  id: number;
}
