import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "sg/core/entities";
import { InventoryRepository } from "sg/core/repositories/inventory/inventory.repository";
import { InventoryService } from "../../services/inventory/inventory.service";
import { InventoryController } from "../../controllers/inventory/inventory.controller";

@Module({
  imports:[
    TypeOrmModule.forFeature([Inventory]),
  ],
  controllers:[InventoryController],
  providers:[InventoryService, InventoryRepository]
})
export class InventoryModule {}
