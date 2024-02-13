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
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProcedureService } from '../services/procedure.service';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { CreateProcedureDto } from '../dto/createProcedure.dto';
import { AssignChildProcedureDto } from '../dto/assignChildProcedure.dto';

@ApiBearerAuth()
@Controller('procedure')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.procedureList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getProcedures(): Promise<ResponseDto> {
    return await this.procedureService.getProcedures();
  }

  // @Roles(Role.Admin, Role.User)
  // @Privileges(Privilege.configList)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getProcedureChild(@Param('id') id: number): Promise<ResponseDto> {
    return await this.procedureService.getProcedureChild(id);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.procedureCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createNote(
    @Body() procedure: CreateProcedureDto,
  ): Promise<ResponseDto> {
    const response = await this.procedureService.createProcedure(procedure);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.procedureCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('assign')
  async assignChildProcedure(
    @Body() procedures: AssignChildProcedureDto[],
  ): Promise<ResponseDto> {
    const response = await this.procedureService.assignChildProcedure(
      procedures,
    );
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.procedureEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateNote(
    @Param('id') id: number,
    @Body() procedure: CreateProcedureDto,
  ): Promise<ResponseDto> {
    const response = await this.procedureService.updateProcedure(id, procedure);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
