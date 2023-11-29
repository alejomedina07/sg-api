import { ApiProperty }          from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {

  @ApiProperty({ description: 'key del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  page?: number;
  
  @ApiProperty({ description: 'key del usuario', required: false })
  @IsOptional()
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  limit?: number;

}