import { Injectable } from '@nestjs/common';
import { ResponseDto } from "../../dto/shared/response.dto";
import { InventoryInOutRepository } from "sg/core/repositories/inventory-in-out/inventory-in-out.repository";
import { CreateInventoryInOutDto } from "../../dto/inventoryInOut/createInventoryInOut.dto";

@Injectable()
export class InventoryInOutService {
  constructor(private inventoryInOutRepository: InventoryInOutRepository) {
  }

  async getInventoryInOut(): Promise<ResponseDto> {
    return await this.inventoryInOutRepository.getInventoryInOuts()
  }

  async createInventoryInOut(data: CreateInventoryInOutDto): Promise<ResponseDto> {
    return await this.inventoryInOutRepository.createInventoryInOut(data);
  }
}
