import { Module } from '@nestjs/common';
import { CoreModule }                           from "sg/core";
import { AuthModule }           from './modules/auth/auth.module';
import { AppointmentModule }    from './modules/appointment/appointment.module';
import { CustomerModule }       from './modules/customer/customer.module';
import { ExpenseModule }        from './modules/expense/expense.module';
import { InventoryModule }      from './modules/inventory/inventory.module';
import { InventoryInOutModule } from './modules/inventory-in-out/inventory-in-out.module';
import { ServiceModule }        from './modules/service/service.module';
import { UserModule }           from './modules/user/user.module';
import { ListController }       from './controllers/config/list.controller';
import { ListService }          from './services/config/list.service';
import { ListRepository }       from 'sg/core/repositories/config/list.repository';
import { TypeOrmModule }        from '@nestjs/typeorm';
import { List }                 from 'sg/core/entities';



@Module({
  imports: [
    CoreModule,
    AuthModule,
    AppointmentModule,
    CustomerModule,
    ExpenseModule,
    InventoryModule,
    InventoryInOutModule,
    ServiceModule,
    UserModule,
    TypeOrmModule.forFeature([List])
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository]
})
export class MainModule {}

