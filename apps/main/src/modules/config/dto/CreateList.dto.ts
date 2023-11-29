import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty }                                    from '@nestjs/swagger';

export class CreateListDto {

  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?:number

  @ApiProperty({ description: 'name del lista', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del lista debe ser texto' })
  name:string

  @ApiProperty({ description: 'key del lista', required: true })
  @IsDefined({ message: 'key: El key es requerido' })
  @IsString({ message: 'key: El key del lista debe ser texto' })
  key:string

  @ApiProperty({ description: 'description del lista', required: false })
  @IsOptional()
  @IsString({ message: 'description: El description del lista debe ser texto' })
  description?:string

  @ApiProperty({ description: 'createdAt del lista', required: false })
  @IsOptional()
  @IsDate({ message: 'createdAt: La fecha no es correcta' })
  createdAt?:Date

  @ApiProperty({ description: 'updatedAt del lista', required: false })
  @IsOptional()
  @IsDate({ message: 'updatedAt: La fecha no es correcta' })
  updatedAt?:Date

  @ApiProperty({ description: 'status del lista', required: false })
  @IsOptional()
  status?:boolean


}
