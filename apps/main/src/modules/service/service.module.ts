import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'sg/core/entities';
import { ServiceRepository } from 'sg/core/repositories/service/service.repository';
import { ServiceService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';
import { DateManagerService } from '../../shared/services/date-manager/date-manager.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
})
export class ServiceModule {}
