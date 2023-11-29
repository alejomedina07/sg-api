import { ApiProperty }                                                  from "@nestjs/swagger";
import { IsDate, IsDateString, IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAppointmentTypeDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'name del cliente', required: false })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name:string

  @ApiProperty({ description: 'description del cliente', required: false })
  @IsOptional()
  @IsString({ message: 'description: El description del cliente debe ser texto' })
  description?:string | null

  @ApiProperty({ description: 'createdAt del AppointmentType', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?:Date

  @ApiProperty({ description: 'status del lista', required: false })
  @IsOptional()
  status?:boolean


}