import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from '../../services/question/question.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateQuestionDto } from '../../dto/createQuestion.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateOptionQuestionDto } from '../../dto/CreateOptionQuestion.dto';

@ApiBearerAuth()
@Controller('survey/question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getQuestions(): Promise<ResponseDto> {
    const response = await this.questionService.getQuestions();
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createQuestion(@Body() data: CreateQuestionDto): Promise<ResponseDto> {
    const response = await this.questionService.createQuestion(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateQuestion(
    @Param('id') id: number,
    @Body() data: CreateQuestionDto,
  ): Promise<ResponseDto> {
    const response = await this.questionService.updateQuestion(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  // OPTION QUESTION

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('option/:questionId')
  async getOptionQuestion(
    @Param('questionId') questionId: number,
  ): Promise<ResponseDto> {
    const response = await this.questionService.getOptionQuestion(questionId);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('option')
  async createOptionQuestion(
    @Body() data: CreateOptionQuestionDto,
  ): Promise<ResponseDto> {
    const response = await this.questionService.createOptionQuestion(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('option/:id')
  async updateOptionQuestion(
    @Param('id') id: number,
    @Body() data: CreateOptionQuestionDto,
  ): Promise<ResponseDto> {
    const response = await this.questionService.updateOptionQuestion(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }
}
