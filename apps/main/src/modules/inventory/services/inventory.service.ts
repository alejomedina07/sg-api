import { Injectable } from '@nestjs/common';
import { InventoryRepository } from 'sg/core/repositories/inventory/inventory.repository';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateInventoryDto } from '../dto/createInventory.dto';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

@Injectable()
export class InventoryService {
  constructor(private inventoryRepository: InventoryRepository) {}

  async getInventory(): Promise<ResponseDto> {
    return await this.inventoryRepository.getInventorys();
  }

  async getInventoryById(
    id: number,
    params: PaginationDto,
  ): Promise<ResponseDto> {
    return await this.inventoryRepository.getInventoryById(id, params);
  }

  async createInventory(data: CreateInventoryDto): Promise<ResponseDto> {
    return await this.inventoryRepository.createInventory(data);
  }

  async updateInventory(
    id: number,
    data: CreateInventoryDto,
  ): Promise<ResponseDto> {
    return await this.inventoryRepository.updateInventory(id, data);
  }
}
