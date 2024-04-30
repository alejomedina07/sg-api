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
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TurnService } from '../services/turn.service';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { CreateTypeTurnDto } from '../dto/createTypeTurn.dto';
import { CreateTurnDto } from '../dto/createTurn.dto';
import { GetAccountPayableDto } from '../../provider/dto/getAccountPayable.dto';
import { GetTurnDto } from '../dto/getTurnDto.dto';

@ApiBearerAuth()
@Controller('turn')
export class TurnController {
  constructor(private turnService: TurnService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.typeTurnList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/type')
  async getTypeTurns(): Promise<ResponseDto> {
    return await this.turnService.getTypeTurns(false);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.turnList, Privilege.attentionList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/type/count')
  async getCountTypeTurns(): Promise<ResponseDto> {
    return await this.turnService.getCountTypeTurns();
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(
    Privilege.typeTurnList,
    Privilege.turnList,
    Privilege.attentionCreate,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/type/list')
  async getTypeTurnsList(): Promise<ResponseDto> {
    return await this.turnService.getTypeTurns(true);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.typeTurnCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('/type')
  async createTypeTurn(@Body() turn: CreateTypeTurnDto): Promise<ResponseDto> {
    const response = await this.turnService.createTypeTurn(turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.typeTurnEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/type/:id')
  async updateTypeTurn(
    @Param('id') id: number,
    @Body() turn: CreateTypeTurnDto,
  ): Promise<ResponseDto> {
    const response = await this.turnService.updateTypeTurn(id, turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  // TURN

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.turnList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getTurns(@Query() params: GetTurnDto): Promise<ResponseDto> {
    return await this.turnService.getTurns(params);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.turnList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/attention/:turnId')
  async getAttention(@Param('turnId') turnId: number): Promise<ResponseDto> {
    return await this.turnService.getAttention(turnId);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.turnCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createTurn(@Body() turn: CreateTurnDto): Promise<ResponseDto> {
    const response = await this.turnService.createTurn(turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.turnEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/type/:id')
  async updateTurn(
    @Param('id') id: number,
    @Body() turn: CreateTurnDto,
  ): Promise<ResponseDto> {
    const response = await this.turnService.updateTurn(id, turn);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
