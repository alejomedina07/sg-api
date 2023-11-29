import { Module } from '@nestjs/common';
import { CoreModule } from 'sg/core';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventoryInOutModule } from './modules/inventory-in-out/inventory-in-out.module';
import { NoteController } from './modules/config/controllers/note/note.controller';
import { NoteService } from './modules/config/services/note/note.service';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { ListController } from './modules/config/controllers/list.controller';
import { ListService } from './modules/config/services/list.service';
import { ListRepository } from 'sg/core/repositories/config/list.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List, Note } from 'sg/core/entities';
import { NoteRepository } from 'sg/core/repositories/note/note.repository';
import { DateManagerService } from './shared/services/date-manager/date-manager.service';
import { ReportService } from './modules/report/services/report.service';
import { ReportController } from './modules/report/controllers/report.controller';
import { ReportModule } from './modules/report/report.module';
import { TurnsGateway } from './gateways/turns.gateway';
import { ConfigModule } from './modules/config/config.module';

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
    TypeOrmModule.forFeature([List, Note]),
    ReportModule,
    ConfigModule,
  ],
  controllers: [ListController, NoteController],
  providers: [
    ListService,
    ListRepository,
    NoteService,
    NoteRepository,
    TurnsGateway,
  ],
})
export class MainModule {}
