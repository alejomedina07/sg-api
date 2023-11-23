import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../dto/shared/response.dto';
import { ReportService } from '../../services/report/report.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilterParamsDto } from '../../dto/report/filterParams.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../guards/rol/roles.guard';

@ApiBearerAuth()
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getReportMain(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    console.log(123, queryParams);
    const res = await this.reportService.getReportMain(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/products')
  async getReportProducts(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    console.log(123, queryParams);
    const res = await this.reportService.getReportProducts(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/dashboard')
  async getReportDashboard(
    @Query() queryParams: FilterParamsDto,
  ): Promise<ResponseDto> {
    console.log(123, queryParams);
    const res = await this.reportService.getReportDashboard(queryParams);
    if (res.code === 500)
      throw new HttpException(res.msg || 'Error!!', res.code || 500);
    return res;
  }
}
