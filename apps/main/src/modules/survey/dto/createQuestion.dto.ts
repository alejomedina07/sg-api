import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum QuestionType {
  MultipleChoice = 'multiple_choice',
  UniqueChoice = 'unique_choice',
  TextChoice = 'text_choice',
}

export class QuestionDto {
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

  @ApiProperty({ description: 'Estado de la pregunta', required: false })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'id de la pregunta', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  cratedById?: number;

  @ApiProperty({ description: 'categoría de la pregunta', required: true })
  @IsDefined({ message: 'categoryId: La categoría es requerido' })
  @IsInt({ message: 'categoryId: La categoría debe ser un número' })
  categoryId: number;

  @ApiProperty({ description: 'tipo de la pregunta', required: true })
  @IsDefined({ message: 'type: El tipo es requerido' })
  @IsEnum(QuestionType, { message: 'type: El tipo de pregunta no es válido' })
  type: QuestionType;
}

export class OptionsQuestionDto {
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

  @ApiProperty({ description: 'Estado de la pregunta', required: false })
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ description: 'questionId de la pregunta', required: false })
  @IsOptional()
  @IsInt({ message: 'questionId: El id debe ser un número' })
  questionId?: number;
}

export class CreateQuestionDto {
  @ApiProperty({ description: 'Pregunta', required: true })
  @IsDefined({ message: 'question: La pregunta es requerida' })
  question: QuestionDto;

  @ApiProperty({
    type: [OptionsQuestionDto],
    description: 'Opciones de la lista',
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @IsArray()
  options?: OptionsQuestionDto[];
}
