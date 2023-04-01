import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateInventoryInOutDto {
  @ApiProperty({ description: 'id del inventario entrada salida', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'quantity del inventario entrada salida', required: true })
  @IsDefined({ message: 'quantity: El quantity es requerido' })
  @IsInt({ message: 'quantity: El quantity debe ser un número' })
  quantity:number

  @ApiProperty({ description: 'type del inventario entrada salida', required: true })
  @IsDefined({ message: 'type: El type es requerido' })
  @IsString({ message: 'type: El type del inventario entrada salida debe ser texto' })
  type:string

  @ApiProperty({ description: 'inventoryId del inventario entrada salida', required: true })
  @IsDefined({ message: 'inventoryId: El inventoryId es requerido' })
  @IsInt({ message: 'inventoryId: El inventoryId debe ser un número' })
  inventoryId:number | null

  @ApiProperty({ description: 'serviceId del inventario entrada salida', required: false })
  @IsOptional()
  @IsInt({ message: 'serviceId: El serviceId debe ser un número' })
  serviceId?:number | null
}