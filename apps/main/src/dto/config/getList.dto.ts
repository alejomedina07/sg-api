import { IsDefined, IsString } from 'class-validator';
import { ApiProperty }                     from '@nestjs/swagger';
import { PaginationDto }                   from '../shared/pagination.dto';

export class GetListDto extends PaginationDto{

  @ApiProperty({ description: 'key del usuario', required: true })
  @IsDefined({ message: 'key: El nombre es requerido' })
  @IsString({ message: 'key: El nombre de usuario debe ser texto' })
  key: string;


}
