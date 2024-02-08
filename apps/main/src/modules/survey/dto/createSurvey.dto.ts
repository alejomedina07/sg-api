import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class SurveyDto {
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

  @ApiProperty({ description: 'Estado de la pregunta', required: false })
  @IsOptional()
  @IsBoolean({ message: 'anonymous: El campo no es correcto.' })
  anonymous: boolean;

  @ApiProperty({ description: 'id de la pregunta', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'Asignar a todos los usuarios', required: false })
  @IsBoolean({ message: 'allUsers: El campo no es correcto.' })
  @IsOptional()
  @ValidateIf((object) => object.anonymous === false)
  allUsers?: boolean;
}

export class CreateSurveyDto {
  @ApiProperty({ description: 'id de la pregunta', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'Pregunta', required: true })
  @IsDefined({ message: 'question: La pregunta es requerida' })
  survey: SurveyDto;

  @ApiProperty({
    type: [Number],
    description: 'Categorías del cuestionario',
    required: false,
  })
  @IsDefined({ message: 'categoriesId: Las categorías son requeridas' })
  @IsArray()
  categoriesId: number[];

  @ApiProperty({ description: 'Público anónimo', required: false })
  @IsOptional()
  @IsBoolean({ message: 'anonymous: El campo no es correcto.' })
  anonymous: boolean;

  @ApiProperty({ description: 'Asignar a todos los usuarios', required: false })
  @IsBoolean({ message: 'allUsers: El campo no es correcto.' })
  @IsOptional()
  @ValidateIf((object) => object.anonymous === false)
  allUsers?: boolean;

  @ApiProperty({
    type: [Number],
    description: 'Usuarios asignados',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateIf(
    (object) => object.anonymous === false && object.allUsers === false,
  )
  @IsNotEmpty({ message: 'users: Dede elegir usuarios' })
  users?: number[];
}
