import { Injectable } from '@nestjs/common';
import { InventoryRepository } from "sg/core/repositories/inventory/inventory.repository";
import { ResponseDto } from "../../dto/shared/response.dto";
import { CreateInventoryDto } from "../../dto/inventory/createInventory.dto";

@Injectable()
export class InventoryService {
  constructor(private inventoryRepository: InventoryRepository) {
  }

  async getInventory(): Promise<ResponseDto> {
    return await this.inventoryRepository.getInventorys()
  }

  async createInventory(data: CreateInventoryDto): Promise<ResponseDto> {
    console.log(2);
    return await this.inventoryRepository.createInventory(data);
  }
}
