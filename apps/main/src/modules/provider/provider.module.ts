import { Module } from '@nestjs/common';
import { ProviderController } from './controllers/provider/provider.controller';
import { ProviderRepository } from 'sg/core/repositories/provider/provider.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPayable, Payment, Provider } from 'sg/core/entities';
import { ProviderService } from './services/provider/provider.service';
import { AccountPayableService } from './services/account-payable/account-payable.service';
import { AccountPayableController } from './controllers/account-payable/account-payable.controller';
import { PaymentController } from './controllers/payment/payment.controller';
import { AccountPayableRepository } from 'sg/core/repositories/provider/account-payable.repository';
import { PaymentRepository } from 'sg/core/repositories/provider/payment.repository';
import { PaymentService } from './services/payment/payment.service';
import { FilterListService } from 'sg/core/services/filters/filterList.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, AccountPayable, Payment])],
  controllers: [
    ProviderController,
    AccountPayableController,
    PaymentController,
  ],
  providers: [
    AccountPayableRepository,
    PaymentRepository,
    ProviderRepository,
    ProviderService,
    AccountPayableService,
    PaymentService,
    FilterListService,
  ],
})
export class ProviderModule {}
