import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from "sg/core/entities";
import { ResponseDto } from "../../../../../apps/main/src/dto/shared/response.dto";

@Injectable()
export class InventoryRepository {
  constructor(@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>) {}

  async createInventory(data: Inventory): Promise<any> {
    try {
      const inventoryInsert = await this.inventoryRepository.manager.insert(Inventory, data);
      return { data: inventoryInsert.identifiers[0].id, msg: 'Inventario creado exitosamente!', code: 200 }
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getInventorys(): Promise<ResponseDto> {
    try {
      return { data: await this.inventoryRepository.manager.find( Inventory, { relations:['status'] } ), msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' }
    }
  }
}
