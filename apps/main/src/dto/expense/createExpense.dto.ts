import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export class CreateExpenseDto {
  @ApiProperty({ description: 'id del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'name del cliente', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del cliente debe ser texto' })
  name:string

  @ApiProperty({ description: 'description del cliente', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({ message: 'description: El description del cliente debe ser texto' })
  description:string | null

  @ApiProperty({ description: 'amount del cliente', required: true })
  @IsDefined({ message: 'amount: El amount es requerido' })
  @IsInt({ message: 'amount: El amount debe ser un número' })
  amount:number

  @ApiProperty({ description: 'Creador del cliente', required: false })
  @IsOptional()
  @IsInt({ message: 'createdById: El creador debe ser un número' })
  createdById?:number

}