import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name del cliente', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del cliente', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({
    message: 'description: El description del cliente debe ser texto',
  })
  description: string | null;

  @ApiProperty({ description: 'status del cliente', required: true })
  @IsDefined({ message: 'status: El status es requerido' })
  @IsInt({ message: 'status: El status del cliente debe ser un numero' })
  statusId: number;

  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  cratedById?: number;
}
