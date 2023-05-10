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
import { ResponseDto } from '../../dto/shared/response.dto';
import { CreateServiceDto } from '../../dto/service/createService.dto';
import { ServiceService } from '../../services/service/service.service';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getService(): Promise<ResponseDto> {
    console.log(999);
    // return await this.serviceService.getReportServices();
    return await this.serviceService.getService();
  }

  @Get('/report')
  async getReportServices(): Promise<ResponseDto> {
    console.log(123);
    const res = await this.serviceService.getReportServices();
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createService(@Body() data: CreateServiceDto): Promise<ResponseDto> {
    return await this.serviceService.createService(data);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateService(
    @Param('id') id: number,
    @Body() data: CreateServiceDto,
  ): Promise<ResponseDto> {
    return await this.serviceService.updateService(id, data);
  }
}
