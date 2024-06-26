import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { CreateAttentionDto } from '../../dto/createAttention.dto';
import { AttentionService } from '../../services/attention/attention.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetAttentionDto } from '../../dto/getAttentionDto.dto';
import { ReassignAttentionDto } from '../../dto/reassignAttention.dto';

@ApiBearerAuth()
@Controller('attentions')
export class AttentionController {
  constructor(private turnService: AttentionService) {}

  @Roles(Role.Admin)
  @Privileges(Privilege.attentionList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAttentions(
    @Query(ValidationPipe) params: GetAttentionDto,
  ): Promise<ResponseDto> {
    return await this.turnService.getAttentions(params);
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.attentionCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createAttention(
    @Body() turn: CreateAttentionDto,
  ): Promise<ResponseDto> {
    const response = await this.turnService.createAttention(turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.turnEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/reassign')
  async reassignAttention(
    @Body() turn: ReassignAttentionDto,
  ): Promise<ResponseDto> {
    const response = await this.turnService.reassignAttention(turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.attentionEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  async updateAttention(
    @Param('id') id: number,
    @Body() turn: CreateAttentionDto,
  ): Promise<ResponseDto> {
    const response = await this.turnService.updateAttention(id, turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.attentionCreate)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/finish/:id')
  async finishAttentionAttention(
    @Param('id') id: number,
    @Body() turn: CreateAttentionDto,
  ): Promise<ResponseDto> {
    const isFinish = turn.isFinish;
    delete turn.isFinish;
    const response = await this.turnService.finishAttention(id, turn, isFinish);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
