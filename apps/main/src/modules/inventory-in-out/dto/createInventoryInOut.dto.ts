import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInventoryInOutDto {
  @ApiProperty({
    description: 'id del inventario entrada salida',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({
    description: 'quantity del inventario entrada salida',
    required: true,
  })
  @IsDefined({ message: 'quantity: El quantity es requerido' })
  @IsInt({ message: 'quantity: El quantity debe ser un número' })
  quantity: number;

  @ApiProperty({
    description: 'type del inventario entrada salida',
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'type: El type del inventario entrada salida debe ser boolean',
  })
  increment?: boolean;

  @ApiProperty({
    description: 'inventoryId del inventario entrada salida',
    required: true,
  })
  @IsDefined({ message: 'inventoryId: El inventoryId es requerido' })
  @IsInt({ message: 'inventoryId: El inventoryId debe ser un número' })
  inventoryId: number | null;

  @ApiProperty({
    description: 'serviceId del inventario entrada salida',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'serviceId: El serviceId debe ser un número' })
  serviceId?: number | null;

  @ApiProperty({
    description: 'note del inventario entrada salida',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'note: El serviceId debe ser un string' })
  note?: string | null;
}
