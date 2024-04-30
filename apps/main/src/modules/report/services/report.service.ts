import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportRepository } from 'sg/core/repositories/report/report.repository';
import { DateManagerService } from '../../../shared/services/date-manager/date-manager.service';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { FilterParamsDto } from '../dto/filterParams.dto';

@Injectable()
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private dateManagerService: DateManagerService,
  ) {}

  async getReportMain(queryParams: FilterParamsDto): Promise<ResponseDto> {
    return await this.reportRepository.getReportMain(
      this.getStructureParams(queryParams),
    );
  }

  async getReportProducts(queryParams: FilterParamsDto): Promise<ResponseDto> {
    return await this.reportRepository.getReportProducts(
      this.getStructureParams(queryParams),
    );
  }

  async getReportTurn(queryParams: FilterParamsDto): Promise<ResponseDto> {
    return await this.reportRepository.getReportTurn(
      this.getStructureParams(queryParams),
    );
  }

  async getReportDashboard(queryParams: FilterParamsDto): Promise<ResponseDto> {
    return await this.reportRepository.getReportDashboard(
      this.getStructureParams(queryParams),
    );
  }

  getStructureParams(queryParams: FilterParamsDto): any {
    switch (queryParams.type) {
      case 'current_month':
        const currentDate = new Date();
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );
        return {
          startDate:
            this.dateManagerService.dateToFormatStandard(startOfMonth) +
            ' 00:00:00',
          endDate:
            this.dateManagerService.dateToFormatStandard(endOfMonth) +
            ' 23:59:59',
        };
        break;
      case 'month':
        return this.dateManagerService.getMonthRange(queryParams.month);
        break;
      case 'range':
        console.log(8888, queryParams);
        return {
          startDate: queryParams.start_date + ' 00:00:00',
          endDate: queryParams.end_date + '  23:59:59',
        };
        break;
      default:
        throw new BadRequestException('Invalid request type.');
    }
  }
}
