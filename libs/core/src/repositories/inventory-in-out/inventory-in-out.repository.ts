import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryInOut } from "sg/core/entities";
import { ResponseDto } from "../../../../../apps/main/src/dto/shared/response.dto";

@Injectable()
export class InventoryInOutRepository {
  constructor(@InjectRepository(InventoryInOut) private inventoryInOutRepository: Repository<InventoryInOut>) {}

  async createInventoryInOut(data: InventoryInOut): Promise<any> {
    try {
      const inventoryInOutInsert = await this.inventoryInOutRepository.manager.insert(InventoryInOut, data);
      return { data: inventoryInOutInsert.identifiers[0].id, msg: 'Creado exitosamente!', code: 200 }
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async updateInventoryInOut(id: number, data: InventoryInOut): Promise<any> {
    try {
      const inventoryInOutInsert = await this.inventoryInOutRepository.update(id, data);
      return { data: inventoryInOutInsert.raw, msg: 'Creado exitosamente!', code: 200 }
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getInventoryInOuts(): Promise<ResponseDto> {
    try {
      return { data: await this.inventoryInOutRepository.manager.find( InventoryInOut ), msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' }
    }
  }
}
