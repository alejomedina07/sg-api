import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";


export class CreateCustomerDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'name del cliente', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name:string


  @ApiProperty({ description: 'bloodType del cliente', required: false })
  @IsDefined({ message: 'bloodType: El bloodType es requerido' })
  @IsString({ message: 'bloodType: El bloodType del cliente debe ser texto' })
  bloodType?:string

  @ApiProperty({ description: 'document del cliente', required: true })
  @IsDefined({ message: 'document: El document es requerido' })
  @IsString({ message: 'document: El document del cliente debe ser texto' })
  document:string | null

  @ApiProperty({ description: 'documentType del cliente', required: true })
  @IsDefined({ message: 'documentType: El documentType es requerido' })
  @IsInt({ message: 'documentType: El documentType del cliente debe ser un número' })
  documentTypeId:number | null

  @ApiProperty({ description: 'address del cliente', required: true })
  @IsDefined({ message: 'address: El address es requerido' })
  @IsString({ message: 'address: El address del cliente debe ser texto' })
  address:string | null

  @ApiProperty({ description: 'phoneNumber del cliente', required: true })
  @IsDefined({ message: 'phoneNumber: El phoneNumber es requerido' })
  @IsString({ message: 'phoneNumber: El phoneNumber del cliente debe ser texto' })
  phoneNumber:string

  @ApiProperty({ description: 'status del cliente', required: true })
  @IsDefined({ message: 'status: El status es requerido' })
  @IsInt({ message: 'status: El status del cliente debe ser un número' })
  statusId:number
}