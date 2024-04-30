import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { ReportService } from '../services/report.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilterParamsDto } from '../dto/filterParams.dto';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';

@ApiBearerAuth()
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Roles(Role.Admin)
  @Privileges(Privilege.reportList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getReportMain(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    const res = await this.reportService.getReportMain(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.reportList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/products')
  async getReportProducts(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    const res = await this.reportService.getReportProducts(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.reportList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/turns')
  async getReportTurn(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    const res = await this.reportService.getReportTurn(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.reportList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/dashboard')
  async getReportDashboard(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    const res = await this.reportService.getReportDashboard(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }
}
