import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory, InventoryInOut } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { PaginationDto } from '../../../../../apps/main/src/shared/dto/pagination.dto';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async createInventory(data: Inventory): Promise<any> {
    try {
      const inventoryInsert = await this.inventoryRepository.manager.insert(
        Inventory,
        data,
      );
      return {
        data: inventoryInsert.identifiers[0].id,
        msg: 'Inventario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(123, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateInventory(id: number, data: Inventory): Promise<any> {
    try {
      const inventoryInsert = await this.inventoryRepository.update(id, data);
      return {
        data: inventoryInsert.raw,
        msg: 'Inventario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getInventorys(): Promise<ResponseDto> {
    try {
      return {
        data: await this.inventoryRepository.manager.find(Inventory, {
          relations: ['status', 'createdBy'],
          order: { name: 'asc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
  async getInventoryById(
    id: number,
    params: PaginationDto,
  ): Promise<ResponseDto> {
    try {
      const { page, limit } = params;
      const inventory = await this.inventoryRepository.manager.findOne(
        Inventory,
        {
          where: { id },
        },
      );

      const [inventoryInOut, totalRecords] =
        await this.inventoryRepository.manager.findAndCount(InventoryInOut, {
          where: { inventoryId: id },
          order: { createdAt: 'desc' },
          relations: ['createdBy'],
          skip: (page - 1) * limit || 0,
          take: limit || 1000,
        });

      return {
        data: { inventory, inventoryInOut, totalInventoryInOut: totalRecords },
        msg: 'Obtenido exitosamente',
        code: 200,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error' };
    }
  }
}
