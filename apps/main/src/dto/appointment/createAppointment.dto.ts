import { ApiProperty }                                                  from "@nestjs/swagger";
import { IsDate, IsDateString, IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'date del cliente', required: true })
  @IsDefined({ message: 'date: El date es requerido' })
  // @IsDate({ message: 'date: La fecha no es correcta' })
  @IsDateString({}, { each: true, message: 'date: La fecha no es correcta' })
  date:Date

  @ApiProperty({ description: 'duration del cliente', required: true })
  @IsDefined({ message: 'duration: El duration es requerido' })
  @IsInt({ message: 'duration: El duration debe ser un número' })
  duration:number

  @ApiProperty({ description: 'name del cliente', required: false })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name:string

  @ApiProperty({ description: 'description del cliente', required: false })
  @IsOptional()
  @IsString({ message: 'description: El description del cliente debe ser texto' })
  description?:string | null

  @ApiProperty({ description: 'customerId del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'customerId: El customerId debe ser un número' })
  customerId?:number | null

  @ApiProperty({ description: 'appointmentTypeId de la cita', required: false })
  @IsOptional()
  @IsInt({ message: 'appointmentTypeId: El appointmentTypeId debe ser un número' })
  appointmentTypeId?:number | null

  @ApiProperty({ description: 'userId del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'userId: El userId debe ser un número' })
  createdById?:number | null
}