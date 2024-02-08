import { Module } from '@nestjs/common';
import { QuestionController } from './controllers/question/question.controller';
import { QuestionService } from './services/question/question.service';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryRepository } from 'sg/core/repositories/survey/category/category.repository';
import { QuestionRepository } from 'sg/core/repositories/survey/question/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Question, Survey, SurveyAnswer } from 'sg/core/entities';
import { SurveyService } from './services/survey/survey.service';
import { SurveyController } from './controllers/survey/survey.controller';
import { SurveyRepository } from 'sg/core/repositories/survey/survey.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Survey]),
    TypeOrmModule.forFeature([SurveyAnswer]),
  ],
  controllers: [QuestionController, CategoryController, SurveyController],
  providers: [
    QuestionService,
    CategoryService,
    CategoryRepository,
    QuestionRepository,
    SurveyService,
    SurveyRepository,
  ],
})
export class SurveyModule {}
