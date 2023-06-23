import { Module } from '@nestjs/common';
import { CoreModule } from 'sg/core';
import { AuthModule } from './modules/auth/auth.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { InventoryInOutModule } from './modules/inventory-in-out/inventory-in-out.module';
import { NoteController } from './controllers/config/note/note.controller';
import { NoteService } from './services/config/note/note.service';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';
import { ListController } from './controllers/config/list.controller';
import { ListService } from './services/config/list.service';
import { ListRepository } from 'sg/core/repositories/config/list.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List, Note } from 'sg/core/entities';
import { NoteRepository } from 'sg/core/repositories/note/note.repository';

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
  ],
  controllers: [ListController, NoteController],
  providers: [ListService, ListRepository, NoteService, NoteRepository],
})
export class MainModule {}
