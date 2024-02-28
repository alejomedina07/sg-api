import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  AccountPayable,
  Expense,
  Payment,
  PaymentAccountPayable,
} from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { CreatePaymentDto } from '../../../../../apps/main/src/modules/provider/dto/createPayment.dto';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private readonly entityManager: EntityManager,
  ) {}

  async createPayment(params: CreatePaymentDto): Promise<ResponseDto> {
    try {
      const { payment, accountsPayable, createdById } = params;
      return this.entityManager.transaction(async (entityManager) => {
        const expenseInsert = await entityManager.insert(Expense, {
          amount: payment.amount,
          name: 'payment',
          createdById: createdById,
          description: payment.description,
          typeId: 16, //TODO pendiente cambiar cuando se ingrese a la base de datos,
        });
        const paymentInsert = await entityManager.insert(Payment, {
          ...payment,
          amount: `${payment.amount}`,
          expenseId: expenseInsert.identifiers[0].id,
          createdById,
        });
        const accountsToInsert = accountsPayable.map((item: any) => {
          return { ...item, paymentId: paymentInsert.identifiers[0].id };
        });

        await entityManager.insert(PaymentAccountPayable, accountsToInsert);
        for (const accountPayable of accountsPayable) {
          const currentRecord = await entityManager.findOne(AccountPayable, {
            where: { id: accountPayable.accountPayableId },
          });
          const currentAmount = `${accountPayable.amount}`;

          const amountPaid =
            parseFloat(currentRecord.amountPaid.replace('$', '')) +
            parseFloat(currentAmount.replace('$', ''));

          currentRecord.amountPaid = `${amountPaid}`;
          if (parseFloat(currentRecord.amount.replace('$', '')) === amountPaid)
            currentRecord.paid = true;
          await entityManager.save(AccountPayable, currentRecord);
        }
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updatePayment(id: number, data: Payment): Promise<ResponseDto> {
    try {
      const paymentInsert = await this.paymentRepository.update(id, data);
      return {
        data: paymentInsert.raw,
        msg: 'Pago actualizado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getPayments(): Promise<ResponseDto> {
    try {
      return {
        data: await this.paymentRepository.manager.find(Payment, {
          relations: ['createdBy'],
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
