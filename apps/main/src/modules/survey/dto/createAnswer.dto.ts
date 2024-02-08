import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @ApiProperty({ description: 'questionId de la respuesta', required: true })
  @IsDefined({ message: 'questionId: El questionId es requerido' })
  @IsInt({ message: 'questionId: El questionId debe ser un número' })
  questionId: number;

  @ApiProperty({
    type: () => [Number, Number, String],
    description: 'Valor de la respuesta',
  })
  @IsDefined({ message: 'value: El campo value es requerido' })
  value: number | number[] | string;
}

export class CreateAnswerDto {
  @ApiProperty({ description: 'id de la respuesta', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'comment de la categoría', required: true })
  @IsDefined({ message: 'comment: El comment es requerido' })
  @IsString({
    message: 'comment: El comment de la categoría debe ser texto',
  })
  comment: string;

  @ApiProperty({ description: 'estado de la categoría', required: false })
  @IsOptional()
  @IsBoolean()
  complete?: boolean;

  @ApiProperty({
    description: 'Fecha de inicio del cuestionario',
    required: true,
  })
  @IsDefined({ message: 'startDate: La Fecha de inicio es requerida' })
  @IsDateString(
    {},
    { each: true, message: 'startDate: La fecha no es correcta' },
  )
  startDate: Date;

  @ApiProperty({ description: 'Fecha de fin del cuestionario', required: true })
  @IsDefined({ message: 'endDate: La Fecha de fin es requerida' })
  @IsDateString({}, { each: true, message: 'endDate: La fecha no es correcta' })
  endDate: Date;

  @ApiProperty({ description: 'Asignado a de la respuesta', required: false })
  @IsOptional()
  @IsInt({ message: 'assignedTo: El id debe ser un número' })
  createdById?: number;

  @ApiProperty({ description: 'Asignado a de la respuesta', required: false })
  @IsOptional()
  @IsInt({ message: 'assignedTo: El id debe ser un número' })
  assignedToId?: number;

  @ApiProperty({ description: 'surveyId de la respuesta', required: true })
  @IsDefined({ message: 'surveyId: El surveyId es requerido' })
  @IsInt({ message: 'surveyId: El id debe ser un número' })
  surveyId: number;

  @ApiProperty({
    type: AnswerDto,
    isArray: true,
    description: 'Respuestas del cuestionario',
  })
  @IsDefined({ message: 'answers: El answers es requerido' })
  @ValidateNested()
  @Type(() => AnswerDto)
  answers?: AnswerDto[];
}
