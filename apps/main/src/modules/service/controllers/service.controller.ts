import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateServiceDto } from '../dto/createService.dto';
import { ServiceService } from '../services/service.service';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

@ApiBearerAuth()
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.serviceList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getService(@Query() params: PaginationDto): Promise<ResponseDto> {
    return await this.serviceService.getService(params);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.serviceCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createService(@Body() data: CreateServiceDto): Promise<ResponseDto> {
    return await this.serviceService.createService(data);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.serviceEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateService(
    @Param('id') id: number,
    @Body() data: CreateServiceDto,
  ): Promise<ResponseDto> {
    return await this.serviceService.updateService(id, data);
  }
}
