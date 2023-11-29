import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from 'sg/core/repositories/expense/expense.repository';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateExpenseDto } from '../dto/createExpense.dto';

@Injectable()
export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) {}

  async getExpenses(): Promise<ResponseDto> {
    return await this.expenseRepository.getExpenses();
  }

  async createExpense(data: CreateExpenseDto): Promise<ResponseDto> {
    return this.expenseRepository.createExpense(data);
  }

  async updateExpense(
    id: number,
    data: CreateExpenseDto,
  ): Promise<ResponseDto> {
    return this.expenseRepository.updateExpense(id, data);
  }
}
