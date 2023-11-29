import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class ExpenseRepository {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  async createExpense(data: Expense): Promise<any> {
    try {
      const expenseInsert = await this.expenseRepository.manager.insert(
        Expense,
        data,
      );
      return {
        data: expenseInsert.identifiers[0].id,
        msg: 'Gasto creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateExpense(id: number, data: Expense): Promise<any> {
    try {
      const expenseInsert = await this.expenseRepository.update(id, data);
      return {
        data: expenseInsert.raw,
        msg: 'Gasto creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getExpenses(): Promise<ResponseDto> {
    try {
      return {
        data: await this.expenseRepository.manager.find(Expense, {
          relations: ['createdBy'],
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
