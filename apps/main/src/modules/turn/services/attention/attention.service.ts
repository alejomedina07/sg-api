import { Injectable } from '@nestjs/common';
import { TurnRepository } from 'sg/core/repositories/turn/turn.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateAttentionDto } from '../../dto/createAttention.dto';
import { Attention } from 'sg/core/entities';

@Injectable()
export class AttentionService {
  constructor(private turnRepository: TurnRepository) {}

  async getAttentions(): Promise<ResponseDto> {
    return this.turnRepository.getAttentions();
  }

  async createAttention(attention: CreateAttentionDto): Promise<any> {
    return this.turnRepository.createAttention(attention);
  }

  async updateAttention(id: number, attention: Attention): Promise<any> {
    return this.turnRepository.updateAttention(id, attention);
  }

  async finishAttention(
    id: number,
    attention: Attention,
    isFinish: boolean,
  ): Promise<any> {
    return this.turnRepository.finishAttention(id, attention, isFinish);
  }
}
