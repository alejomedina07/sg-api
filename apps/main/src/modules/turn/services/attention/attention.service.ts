import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateAttentionDto } from '../../dto/createAttention.dto';
import { Attention } from 'sg/core/entities';
import { AttentionRepository } from 'sg/core/repositories/turn/attention.repository';
import { GetAttentionDto } from '../../dto/getAttentionDto.dto';
import { ReassignAttentionDto } from '../../dto/reassignAttention.dto';

@Injectable()
export class AttentionService {
  constructor(private attentionRepository: AttentionRepository) {}

  async getAttentions(params: GetAttentionDto): Promise<ResponseDto> {
    return this.attentionRepository.getAttentions(params);
  }

  async createAttention(attention: CreateAttentionDto): Promise<any> {
    return this.attentionRepository.createAttention(attention);
  }

  async updateAttention(id: number, attention: Attention): Promise<any> {
    return this.attentionRepository.updateAttention(id, attention);
  }

  async reassignAttention(turn: ReassignAttentionDto): Promise<any> {
    return this.attentionRepository.reassignAttention(turn);
  }

  async finishAttention(
    id: number,
    attention: Attention,
    isFinish: boolean,
  ): Promise<any> {
    return this.attentionRepository.finishAttention(id, attention, isFinish);
  }
}
