import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { Transform } from 'class-transformer';

export class GetListDto extends PaginationDto {
  @ApiProperty({ description: 'key del usuario', required: true })
  @IsDefined({ message: 'key: El nombre es requerido' })
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  key: string;

  @ApiProperty({ description: 'key del usuario', required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  getAll?: boolean;
}
