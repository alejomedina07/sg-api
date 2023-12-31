import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { ListRepository } from 'sg/core/repositories/config/list.repository';
import { GetListDto } from '../dto/getList.dto';
import { CreateListDto } from '../dto/CreateList.dto';

@Injectable()
export class ListService {
  constructor(private configRepository: ListRepository) {}

  async createList(data: CreateListDto): Promise<ResponseDto> {
    return this.configRepository.createList(data);
  }

  async updateList(id: number, data: CreateListDto): Promise<ResponseDto> {
    return this.configRepository.updateList(id, data);
  }

  async getList(params: GetListDto): Promise<ResponseDto> {
    return this.configRepository.getList(params);
  }

  async getAllOptions(): Promise<ResponseDto> {
    return this.configRepository.getAllOptions();
  }
}
