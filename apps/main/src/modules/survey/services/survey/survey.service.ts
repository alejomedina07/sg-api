import { Injectable } from '@nestjs/common';
import { SurveyRepository } from 'sg/core/repositories/survey/survey.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateSurveyDto, SurveyDto } from '../../dto/createSurvey.dto';
import { CreateAnswerDto } from '../../dto/createAnswer.dto';
import { SurveyAnswer } from 'sg/core/entities';

@Injectable()
export class SurveyService {
  constructor(private surveyRepository: SurveyRepository) {}

  async getSurveys(): Promise<ResponseDto> {
    return await this.surveyRepository.getSurveys();
  }

  async getMySurveys(idUser: number, complete: boolean): Promise<ResponseDto> {
    return await this.surveyRepository.getMySurveys(idUser, complete);
  }

  async getSurveyComplete(id: number): Promise<ResponseDto> {
    return await this.surveyRepository.getSurveyComplete(id);
  }

  async getAssignSurvey(id: number): Promise<ResponseDto> {
    const res = await this.surveyRepository.getAssignSurvey(id);
    let users: any;
    if (Array.isArray(res.data)) {
      users = res.data.map((item: any) => {
        return {
          id: item.assignedTo.id,
          firstName: item.assignedTo.firstName,
          lastName: item.assignedTo.lastName,
          phoneNumber: item.assignedTo.phoneNumber,
          email: item.assignedTo.email,
          documentNumber: item.assignedTo.documentNumber,
        };
      });
    }
    res.data = users;
    return res;
  }

  async assignSurvey(data: {
    users: number[];
    surveyId: number;
    createdById: number | null;
  }): Promise<ResponseDto> {
    const { users, surveyId, createdById } = data;
    let usersToAssign: SurveyAnswer[] = [];
    console.log(12354, usersToAssign);
    users.forEach((assignedToId) => {
      usersToAssign.push({
        assignedToId,
        surveyId,
        createdById,
      });
    });
    return await this.surveyRepository.assignSurvey(usersToAssign);
  }

  async createSurvey(data: CreateSurveyDto): Promise<ResponseDto> {
    const { survey, categoriesId, createdById } = data;
    survey.createdById = createdById;
    if (data.anonymous) survey.anonymous = true;
    if (data.allUsers) survey.allUsers = true;
    return await this.surveyRepository.createSurvey(
      survey,
      categoriesId,
      data.users,
    );
  }

  async updateSurvey(id: number, data: SurveyDto): Promise<ResponseDto> {
    return await this.surveyRepository.updateSurvey(id, data);
  }

  async createAnswer(data: CreateAnswerDto): Promise<ResponseDto> {
    return await this.surveyRepository.createAnswer(data);
  }

  async viewAnswer(idSurveyAnswer: number): Promise<ResponseDto> {
    return await this.surveyRepository.viewAnswer(idSurveyAnswer);
  }

  async viewAnswerOfSurvey(idSurvey: number): Promise<ResponseDto> {
    return await this.surveyRepository.viewAnswerOfSurvey(idSurvey);
  }
}
