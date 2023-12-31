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
import { AppointmentService } from '../services/appointment.service';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateAppointmentDto } from '../dto/createAppointment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { CreateAppointmentTypeDto } from '../dto/createAppointmentType.dto';
import { AppointmentParamsDto } from '../dto/AppointmentParams.dto';

@ApiBearerAuth()
@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.appointmentList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAppointments(
    @Query() range: AppointmentParamsDto,
  ): Promise<ResponseDto> {
    const response = await this.appointmentService.getAppointments(range);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.appointmentCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createAppointment(
    @Body() data: CreateAppointmentDto,
  ): Promise<ResponseDto> {
    const response = await this.appointmentService.createAppointment(data);
    if (response.code !== 200)
      throw new HttpException(
        response.msg || 'Error al intentar guardar!',
        500,
      );
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.appointmentEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateAppointment(
    @Param('id') id: number,
    @Body() data: CreateAppointmentDto,
  ): Promise<ResponseDto> {
    const response = await this.appointmentService.updateAppointment(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar!', 500);
    return response;
  }

  // Appointment type

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/type')
  async getAppointmentType(@Query() params): Promise<ResponseDto> {
    const { getAll } = params;
    const response = await this.appointmentService.getAppointmentTypes(getAll);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('/type')
  async createAppointmentType(
    @Body() data: CreateAppointmentTypeDto,
  ): Promise<ResponseDto> {
    const response = await this.appointmentService.createAppointmentType(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/type/:id')
  async updateAppointmentType(
    @Param('id') id: number,
    @Body() data: CreateAppointmentTypeDto,
  ): Promise<ResponseDto> {
    const response = await this.appointmentService.updateAppointmentType(
      id,
      data,
    );
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar!', 500);
    return response;
  }
}
