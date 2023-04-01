import { Test, TestingModule } from '@nestjs/testing';
import { InventoryInOutService } from './inventory-in-out.service';

describe('InventoryInOutService', () => {
  let service: InventoryInOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryInOutService],
    }).compile();

    service = module.get<InventoryInOutService>(InventoryInOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
