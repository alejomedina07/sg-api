import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreatePaymentDto } from '../../dto/createPayment.dto';
import { Payment } from 'sg/core/entities';
import { PaymentRepository } from 'sg/core/repositories/provider/payment.repository';
import { GetPaymentDto } from '../../dto/getPayment.dto';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}
  async getPayments(params: GetPaymentDto): Promise<ResponseDto> {
    return this.paymentRepository.getPayments(params);
  }

  async createPayment(payment: CreatePaymentDto): Promise<ResponseDto> {
    return this.paymentRepository.createPayment(payment);
  }

  async updatePayment(id: number, payment: Payment): Promise<ResponseDto> {
    return this.paymentRepository.updatePayment(id, payment);
  }
}
