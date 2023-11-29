import { Test, TestingModule } from '@nestjs/testing';
import { DateManagerService } from './date-manager.service';

describe('DateManagerService', () => {
  let service: DateManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateManagerService],
    }).compile();

    service = module.get<DateManagerService>(DateManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
