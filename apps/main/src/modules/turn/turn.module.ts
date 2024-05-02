import { Module } from '@nestjs/common';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnRepository } from 'sg/core/repositories/turn/turn.repository';
import { Attention, Turn, TypeTurn } from 'sg/core/entities';
import { AttentionService } from './services/attention/attention.service';
import { AttentionController } from './controllers/attention/attention.controller';
import { FilterListService } from 'sg/core/services/filters/filterList.service';
import { AttentionRepository } from 'sg/core/repositories/turn/attention.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeTurn, Turn, Attention])],
  providers: [
    TurnService,
    TurnRepository,
    AttentionRepository,
    AttentionService,
    FilterListService,
  ],
  controllers: [TurnController, AttentionController],
})
export class TurnModule {}
