import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { SurveyService } from '../../services/survey/survey.service';
import { CreateSurveyDto, SurveyDto } from '../../dto/createSurvey.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { CreateAnswerDto } from '../../dto/createAnswer.dto';

@ApiBearerAuth()
@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getSurveys(): Promise<ResponseDto> {
    const response = await this.surveyService.getSurveys();
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:idUser')
  async getMySurveys(
    @Param('idUser') idUser: number,
    @Query('list', ParseBoolPipe) list: boolean,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.getMySurveys(idUser, list);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  // @Roles(Role.Admin, Role.User)
  // @Privileges(Privilege.surveyList)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/complete/:idSurvey')
  async getSurveyComplete(
    @Param('idSurvey') idSurvey: number,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.getSurveyComplete(idSurvey);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/assign/:idSurvey')
  async getAssignSurvey(
    @Param('idSurvey') idSurvey: number,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.getAssignSurvey(idSurvey);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createSurvey(@Body() data: CreateSurveyDto): Promise<ResponseDto> {
    const response = await this.surveyService.createSurvey(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('/assign')
  async assignSurvey(
    @Body()
    data: {
      users: number[];
      surveyId: number;
      createdById: number | null;
    },
  ): Promise<ResponseDto> {
    const response = await this.surveyService.assignSurvey(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateSurvey(
    @Param('id') id: number,
    @Body() data: SurveyDto,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.updateSurvey(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  // Answers

  @Post('/answer')
  async createAnswer(@Body() data: CreateAnswerDto): Promise<ResponseDto> {
    const response = await this.surveyService.createAnswer(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/view-answers/:idSurveyAnswer')
  async viewAnswer(
    @Param('idSurveyAnswer') idSurveyAnswer: number,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.viewAnswer(idSurveyAnswer);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Get('/view-answers-survey/:idSurvey')
  async viewAnswerOfSurvey(
    @Param('idSurvey') idSurvey: number,
  ): Promise<ResponseDto> {
    const response = await this.surveyService.viewAnswerOfSurvey(idSurvey);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }
}
