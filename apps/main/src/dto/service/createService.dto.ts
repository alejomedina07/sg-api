import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ description: 'id del servicio', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'amount del servicio', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsString({ message: 'amount: El amount del servicio debe ser texto' })
  amount:string

  @ApiProperty({ description: 'status del servicio', required: true })
  @IsDefined({ message: 'status: El status es requerido' })
  @IsInt({ message: 'statusId: El id debe ser un número' })
  statusId:number

  @ApiProperty({ description: 'appointmentId del servicio', required: false })
  @IsOptional()
  @IsInt({ message: 'appointmentId: El appointmentId debe ser un número' })
  appointmentId?:number | null

  @ApiProperty({ description: 'customerId del servicio', required: true })
  @IsDefined({ message: 'customerId: El customerId es requerido' })
  @IsInt({ message: 'customerId: El customerId debe ser un número' })
  customerId:number | null

  @ApiProperty({ description: 'createdById del servicio', required: true })
  @IsDefined({ message: 'createdById: El userId es requerido' })
  @IsInt({ message: 'createdById: El userId debe ser un número' })
  createdById?:number | null

  @ApiProperty({ description: 'description del servicio', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({ message: 'description: El description del servicio debe ser texto' })
  description:string


  // TODO CREATED AT

}