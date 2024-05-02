import { Injectable } from '@nestjs/common';
import { TurnRepository } from 'sg/core/repositories/turn/turn.repository';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { Turn, TypeTurn } from 'sg/core/entities';
import { CreateTypeTurnDto } from '../dto/createTypeTurn.dto';
import { CreateTurnDto } from '../dto/createTurn.dto';
import { GetTurnDto } from '../dto/getTurnDto.dto';

@Injectable()
export class TurnService {
  constructor(private turnRepository: TurnRepository) {}

  async getTypeTurns(list: boolean): Promise<ResponseDto> {
    return this.turnRepository.getTypeTurns(list);
  }

  async getCountTypeTurns(): Promise<ResponseDto> {
    return this.turnRepository.getCountTypeTurns();
  }

  async createTypeTurn(typeTurn: CreateTypeTurnDto): Promise<any> {
    return this.turnRepository.createTypeTurn(typeTurn);
  }

  async updateTypeTurn(id: number, turn: TypeTurn): Promise<any> {
    return this.turnRepository.updateTypeTurn(id, turn);
  }

  // TURN

  async getTurns(params: GetTurnDto): Promise<ResponseDto> {
    return this.turnRepository.getTurns(params);
  }

  async getAttention(turnId: number): Promise<ResponseDto> {
    return this.turnRepository.getAttention(turnId);
  }

  async createTurn(typeTurn: CreateTurnDto): Promise<any> {
    return this.turnRepository.createTurn(typeTurn, typeTurn.typeTurns);
  }

  async updateTurn(id: number, turn: CreateTurnDto): Promise<any> {
    return this.turnRepository.updateTurn(id, turn);
  }
}
