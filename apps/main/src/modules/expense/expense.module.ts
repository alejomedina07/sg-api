import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "sg/core/entities";
import { ExpenseRepository } from "sg/core/repositories/expense/expense.repository";
import { ExpenseService } from "../../services/expense/expense.service";
import { ExpenseController } from "../../controllers/expense/expense.controller";

@Module({
  imports:[
    TypeOrmModule.forFeature([Expense]),
  ],
  controllers:[ExpenseController],
  providers:[ExpenseService, ExpenseRepository]
})
export class ExpenseModule {}
