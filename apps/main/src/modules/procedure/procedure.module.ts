import { Module } from '@nestjs/common';
import { ProcedureService } from './services/procedure.service';
import { ProcedureController } from './controllers/procedure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from 'sg/core/entities';
import { ProcedureRepository } from 'sg/core/repositories/procedure/procedure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProcedureService, ProcedureRepository],
  controllers: [ProcedureController],
})
export class ProcedureModule {}
