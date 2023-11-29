import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'sg/core/entities';
import { ReportRepository } from 'sg/core/repositories/report/report.repository';
import { DateManagerService } from '../../shared/services/date-manager/date-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ReportController],
  providers: [ReportRepository, ReportService, DateManagerService],
})
export class ReportModule {}
