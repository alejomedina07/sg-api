import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseDto }                            from "../../dto/shared/response.dto";
import { CreateServiceDto }                 from "../../dto/service/createService.dto";
import { ServiceService }                   from "../../services/service/service.service";
import { Roles }                            from '../../decorators/roles.decorator';
import { Role }                             from '../../enums/role.enum';
import { JwtAuthGuard }                     from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard }                       from '../../guards/rol/roles.guard';
import { SetCreatedByGuard }                from '../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth }                    from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getService(): Promise<ResponseDto> {
    return await this.serviceService.getService();
  }


  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createService(@Body() data: CreateServiceDto): Promise<ResponseDto> {
    return await this.serviceService.createService(data);
  }
}
