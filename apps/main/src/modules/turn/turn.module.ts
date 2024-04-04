import { Module } from '@nestjs/common';
import { TurnService } from './services/turn.service';
import { TurnController } from './controllers/turn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnRepository } from 'sg/core/repositories/turn/turn.repository';
import { Turn, TypeTurn } from 'sg/core/entities';
import { AttentionService } from './services/attention/attention.service';
import { AttentionController } from './controllers/attention/attention.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeTurn, Turn])],
  providers: [TurnService, TurnRepository, AttentionService],
  controllers: [TurnController, AttentionController],
})
export class TurnModule {}
