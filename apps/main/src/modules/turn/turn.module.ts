import { Module } from '@nestjs/common';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnRepository } from 'sg/core/repositories/turn/turn.repository';
import { Turn, TypeTurn } from 'sg/core/entities';
import { AttentionService } from './services/attention/attention.service';
import { AttentionController } from './controllers/attention/attention.controller';
import { FilterListService } from 'sg/core/services/filters/filterList.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeTurn, Turn])],
  providers: [TurnService, TurnRepository, AttentionService, FilterListService],
  controllers: [TurnController, AttentionController],
})
export class TurnModule {}
