import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Not, Repository } from 'typeorm';
import { Answer, Survey, SurveyAnswer, SurveyCategory } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { CreateAnswerDto } from '../../../../../apps/main/src/modules/survey/dto/createAnswer.dto';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(Survey)
    private surveyAnswerRepository: Repository<SurveyAnswer>,
    private readonly entityManager: EntityManager,
  ) {}

  async createSurvey(
    survey: Survey,
    categoriesId: number[],
    users: number[],
  ): Promise<any> {
    try {
      console.log(999, survey);
      // return { success: true, msg: 'Creado exitosamente!', code: 200 };
      return this.entityManager.transaction(async (entityManager) => {
        const surveyInsert = await entityManager.insert(Survey, survey);
        const optionsToInsert = categoriesId.map((item) => {
          return {
            surveyId: surveyInsert.identifiers[0].id,
            categoryId: item,
          };
        });

        console.log(456, optionsToInsert);

        await entityManager.insert(SurveyCategory, optionsToInsert);

        if (!survey.anonymous) {
          let surveyAnswersToInsert: SurveyAnswer[] = [];

          function insetUsers(users: number[]) {
            users.forEach((item: number) => {
              surveyAnswersToInsert.push({
                surveyId: surveyInsert.identifiers[0].id,
                assignedToId: item,
                createdById: survey.createdById,
              });
            });
          }
          if (users?.length) {
            insetUsers(users);
          }
          // else {
          //   const usersToAssign = await entityManager.find(User, {
          //     select: ['id'],
          //   });
          //   insetUsers(usersToAssign.map((user) => user.id));
          // }
          console.log('surveyAnswersToInsert', surveyAnswersToInsert);
          await entityManager.insert(SurveyAnswer, surveyAnswersToInsert);
        }

        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(666, e);
      throw e; // Realizar el rollback
      // return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateSurvey(id: number, data: Survey): Promise<any> {
    try {
      const surveyInsert = await this.surveyRepository.update(id, data);
      return {
        data: surveyInsert.raw,
        msg: 'Cuestionario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async assignSurvey(usersToAssign: SurveyAnswer[]): Promise<any> {
    try {
      console.log(777, usersToAssign);
      const surveyInsert = await this.surveyAnswerRepository.manager.insert(
        SurveyAnswer,
        usersToAssign,
      );
      return {
        data: surveyInsert.raw,
        msg: 'Cuestionario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getSurveys(): Promise<ResponseDto> {
    try {
      return {
        data: await this.surveyRepository.manager.find(Survey, {
          relations: ['createdBy'],
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getMySurveys(
    assignedToId: number,
    complete: boolean,
  ): Promise<ResponseDto> {
    try {
      let data;
      if (complete) {
        data = await this.surveyRepository.manager.find(SurveyAnswer, {
          where: { assignedToId, complete },
          relations: ['survey'],
          // select: ['id', 'survey', 'assignedToId', 'startDate'],
        });
      } else {
        const surveysAssigned = await this.surveyRepository.manager.find(
          SurveyAnswer,
          {
            where: { assignedToId, complete },
            select: ['id', 'surveyId', 'assignedToId', 'complete'],
          },
        );

        const surveysFinished = await this.surveyRepository.manager.find(
          SurveyAnswer,
          {
            where: { assignedToId, complete: true },
            select: ['id', 'surveyId', 'assignedToId'],
          },
        );

        console.log(13224, surveysAssigned);
        let where: object[] = [
          {
            anonymous: true,
            status: true,
            id: Not(In(surveysFinished.map((sf) => sf.surveyId))),
          },
        ];
        if (surveysAssigned?.length)
          where.push({
            id: In(surveysAssigned.map((sa) => sa.surveyId)),
            status: true,
          });
        if (assignedToId != 0)
          where.push({
            allUsers: true,
            status: true,
            id: Not(In(surveysFinished.map((sf) => sf.surveyId))),
          });
        console.log(99996969, where);
        data = await this.surveyRepository.manager.find(Survey, {
          where,
          order: { id: 'desc' },
        });
      }
      return { data, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(666, e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getSurveyComplete(id: number): Promise<ResponseDto> {
    try {
      return {
        data: await this.surveyRepository.manager.findOne(Survey, {
          relations: [
            'surveyCategories',
            'surveyCategories.category',
            'surveyCategories.category.questions',
            'surveyCategories.category.questions.optionQuestions',
          ],
          where: {
            id,
            status: true,
            surveyCategories: {
              category: {
                status: true,
                questions: { status: true },
              },
            },
          },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getAssignSurvey(surveyId: number): Promise<ResponseDto> {
    try {
      return {
        data: await this.surveyAnswerRepository.manager.find(SurveyAnswer, {
          relations: ['assignedTo'],
          where: { surveyId },
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  // Answer

  async createAnswer(data: CreateAnswerDto): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        let surveyAnswer = await entityManager.findOne(SurveyAnswer, {
          where: { surveyId: data.surveyId, assignedToId: data.assignedToId },
        });
        let surveyAnswerId: number;
        const survey = await entityManager.findOne(Survey, {
          where: { id: data.surveyId },
          select: ['id', 'anonymous'],
        });
        if (surveyAnswer && !survey.anonymous) {
          surveyAnswer = {
            ...surveyAnswer,
            comment: data.comment,
            startDate: data.startDate,
            endDate: data.endDate,
            complete: true,
          };
          const surveyAnswerUpdate = await entityManager.update(
            SurveyAnswer,
            { id: surveyAnswer.id },
            surveyAnswer,
          );
          surveyAnswerId = surveyAnswerUpdate.affected;
        } else {
          const surveyInsert = await entityManager.insert(SurveyAnswer, {
            ...data,
            complete: true,
            createdById: data.assignedToId,
          });
          surveyAnswerId = surveyInsert.identifiers[0].id;
        }

        let optionsToInsert = [];
        data.answers.forEach((item) => {
          const base = {
            surveyId: data.surveyId,
            surveyAnswerId,
            questionId: item.questionId,
          };

          if (typeof item.value === 'string') {
            optionsToInsert.push({
              // surveyAnswerId,
              // questionId: item.questionId,
              ...base,
              textAnswer: item.value,
            });
          } else if (typeof item.value === 'number') {
            optionsToInsert.push({
              // surveyAnswerId,
              // questionId: item.questionId,
              ...base,
              optionQuestionId: item.value,
            });
          } else if (Array.isArray(item.value)) {
            item.value.forEach((optionQuestionId: number) => {
              optionsToInsert.push({
                // surveyAnswerId,
                // questionId: item.questionId,
                ...base,
                optionQuestionId,
              });
            });
          }
        });

        await entityManager.insert(Answer, optionsToInsert);
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async viewAnswer(id: number): Promise<any> {
    try {
      return {
        data: await this.surveyRepository.manager.findOne(SurveyAnswer, {
          relations: [
            'survey',
            'answers',
            'survey.surveyCategories',
            'survey.surveyCategories.category',
            'survey.surveyCategories.category.questions',
            'survey.surveyCategories.category.questions.optionQuestions',
          ],
          where: { id },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  async viewAnswerOfSurvey(id: number): Promise<any> {
    try {
      return {
        data: await this.surveyRepository.manager.findOne(Survey, {
          relations: [
            'surveyCategories',
            'answers',
            'surveyCategories.category',
            'surveyCategories.category.questions',
            'surveyCategories.category.questions.optionQuestions',
          ],
          where: { id },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
