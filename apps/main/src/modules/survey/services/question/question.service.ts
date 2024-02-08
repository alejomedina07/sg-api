import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'sg/core/repositories/survey/question/question.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateQuestionDto } from '../../dto/createQuestion.dto';
import { CreateOptionQuestionDto } from '../../dto/CreateOptionQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async getQuestions(): Promise<ResponseDto> {
    return await this.questionRepository.getQuestions();
  }
  async createQuestion(data: CreateQuestionDto): Promise<ResponseDto> {
    return await this.questionRepository.createQuestion(data);
  }

  async updateQuestion(
    id: number,
    data: CreateQuestionDto,
  ): Promise<ResponseDto> {
    return await this.questionRepository.updateQuestion(id, data);
  }

  // OPTION QUESTION

  async getOptionQuestion(questionId: number): Promise<ResponseDto> {
    return await this.questionRepository.getOptionQuestion(questionId);
  }
  async createOptionQuestion(
    data: CreateOptionQuestionDto,
  ): Promise<ResponseDto> {
    return await this.questionRepository.createOptionQuestion(data);
  }

  async updateOptionQuestion(
    id: number,
    data: CreateOptionQuestionDto,
  ): Promise<ResponseDto> {
    return await this.questionRepository.updateOptionQuestion(id, data);
  }
}
