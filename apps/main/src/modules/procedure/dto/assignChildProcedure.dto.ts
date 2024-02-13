import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional } from 'class-validator';

export class AssignChildProcedureDto {
  @ApiProperty({ description: 'id del procedimiento', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'id del procedimiento', required: false })
  @IsDefined({ message: 'procedureIdParent: El padre es requerido' })
  @IsInt({ message: 'id: El id debe ser un número' })
  procedureIdParentId: number;

  @ApiProperty({ description: 'id del procedimiento', required: false })
  @IsDefined({ message: 'procedureIdChildren: El hijo es requerido' })
  @IsInt({ message: 'id: El id debe ser un número' })
  procedureIdChildrenId: number;
}
