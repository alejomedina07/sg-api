import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory, InventoryInOut } from 'sg/core/entities';
import { InventoryInOutRepository } from 'sg/core/repositories/inventory-in-out/inventory-in-out.repository';
import { InventoryInOutService } from './services/inventory-in-out.service';
import { InventoryInOutController } from './controllers/inventory-in-out.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryInOut, Inventory])],
  controllers: [InventoryInOutController],
  providers: [InventoryInOutService, InventoryInOutRepository],
})
export class InventoryInOutModule {}
