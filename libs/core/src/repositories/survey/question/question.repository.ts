import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OptionQuestion, Question } from 'sg/core/entities';
import { ResponseDto } from '../../../../../../apps/main/src/shared/dto/response.dto';
import { CreateQuestionDto } from '../../../../../../apps/main/src/modules/survey/dto/createQuestion.dto';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly entityManager: EntityManager,
  ) {}

  async createQuestion(data: CreateQuestionDto): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const questionInsert = await entityManager.insert(
          Question,
          data.question,
        );

        if (data.options?.length) {
          const optionsToInsert = data.options.map((item) => {
            return {
              ...item,
              questionId: questionInsert.identifiers[0].id,
            };
          });

          await entityManager.insert(OptionQuestion, optionsToInsert);
        }
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });

      // const questionInsert = await this.questionRepository.manager.insert(
      //   Question,
      //   data,
      // );
      // return {
      //   data: questionInsert.identifiers[0].id,
      //   msg: 'Pregunta creado exitosamente!',
      //   code: 200,
      // };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateQuestion(id: number, data: CreateQuestionDto): Promise<any> {
    try {
      const questionInsert = await this.questionRepository.update(id, {
        name: data.question.name,
        description: data.question.description,
        status: data.question.status,
      });
      return {
        data: questionInsert.raw,
        msg: 'Pregunta creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getQuestions(): Promise<ResponseDto> {
    try {
      return {
        data: await this.questionRepository.manager.find(Question, {
          relations: ['category', 'optionQuestions'],
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  // OPTION QUESTIONS

  async createOptionQuestion(data: OptionQuestion): Promise<any> {
    try {
      const questionInsert = await this.questionRepository.manager.insert(
        OptionQuestion,
        data,
      );
      return {
        data: questionInsert.identifiers[0].id,
        msg: 'Pregunta creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateOptionQuestion(id: number, data: OptionQuestion): Promise<any> {
    try {
      const questionInsert = await this.questionRepository.update(id, data);
      return {
        data: questionInsert.raw,
        msg: 'Pregunta creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getOptionQuestion(questionId: number): Promise<ResponseDto> {
    try {
      return {
        data: await this.questionRepository.manager.find(OptionQuestion, {
          order: { id: 'desc' },
          where: { questionId },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
