import { Test, TestingModule } from '@nestjs/testing';
import { InventoryInOutController } from './inventory-in-out.controller';

describe('InventoryInOutController', () => {
  let controller: InventoryInOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryInOutController],
    }).compile();

    controller = module.get<InventoryInOutController>(InventoryInOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
