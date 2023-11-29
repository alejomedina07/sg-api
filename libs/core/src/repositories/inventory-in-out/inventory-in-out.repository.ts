import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inventory, InventoryInOut } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class InventoryInOutRepository {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(InventoryInOut)
    private inventoryInOutRepository: Repository<InventoryInOut>,
    private readonly entityManager: EntityManager,
  ) {}

  async createInventoryInOut(data: InventoryInOut): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const inventory = await this.inventoryRepository.findOne({
          where: { id: data.inventoryId },
        });

        inventory.quantity = data.increment
          ? data.quantity + inventory.quantity
          : inventory.quantity - data.quantity;
        if (inventory.quantity < 0)
          return { success: false, msg: 'Operación no permitida' };
        await entityManager.insert(InventoryInOut, data);
        await entityManager.save(Inventory, inventory);

        return { success: true, msg: 'Creado exitosamente!' };
      });
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateInventoryInOut(id: number, data: InventoryInOut): Promise<any> {
    try {
      const inventoryInOutInsert = await this.inventoryInOutRepository.update(
        id,
        data,
      );
      return {
        data: inventoryInOutInsert.raw,
        msg: 'Creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getInventoryInOuts(): Promise<ResponseDto> {
    try {
      return {
        data: await this.inventoryInOutRepository.manager.find(InventoryInOut),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
