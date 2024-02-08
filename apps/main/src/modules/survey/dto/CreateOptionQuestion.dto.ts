import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateOptionQuestionDto {
  @ApiProperty({ description: 'id de la pregunta', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name de la pregunta', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name de la pregunta debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description de la pregunta', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({
    message: 'description: El description de la pregunta debe ser texto',
  })
  description: string | null;

  @ApiProperty({ description: 'categoría de la pregunta', required: true })
  @IsDefined({ message: 'categoryId: La categoría es requerido' })
  @IsInt({ message: 'categoryId: La categoría debe ser un número' })
  questionId: number;
}
