import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../dto/shared/response.dto';
import { InventoryInOutRepository } from 'sg/core/repositories/inventory-in-out/inventory-in-out.repository';
import { CreateInventoryInOutDto } from '../../dto/inventoryInOut/createInventoryInOut.dto';
import { InventoryRepository } from 'sg/core/repositories/inventory/inventory.repository';

@Injectable()
export class InventoryInOutService {
  constructor(private inventoryInOutRepository: InventoryInOutRepository) {}

  async getInventoryInOut(): Promise<ResponseDto> {
    return await this.inventoryInOutRepository.getInventoryInOuts();
  }

  async createInventoryInOut(
    data: CreateInventoryInOutDto,
  ): Promise<ResponseDto> {
    const res = await this.inventoryInOutRepository.createInventoryInOut(data);
    console.log(789, res);
    return {
      code: res?.success ? 200 : 500,
      msg: res?.msg || 'error al intentar guardar',
    };
  }

  async updateInventoryInOut(
    id: number,
    data: CreateInventoryInOutDto,
  ): Promise<ResponseDto> {
    return await this.inventoryInOutRepository.updateInventoryInOut(id, data);
  }
}
