import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateAccountPayableDto } from '../../dto/createAccountPayable.dto';
import { AccountPayable } from 'sg/core/entities';
import { AccountPayableRepository } from 'sg/core/repositories/provider/account-payable.repository';
import { GetAccountPayableDto } from '../../dto/getAccountPayable.dto';

@Injectable()
export class AccountPayableService {
  constructor(private accountPayableRepository: AccountPayableRepository) {}

  async getAccountPayables(params: GetAccountPayableDto): Promise<ResponseDto> {
    return this.accountPayableRepository.getAccountPayables(params);
  }

  async getAccountPayableById(id: number): Promise<ResponseDto> {
    return this.accountPayableRepository.getAccountPayableById(id);
  }

  async createAccountPayable(
    accountPayable: CreateAccountPayableDto,
  ): Promise<any> {
    return this.accountPayableRepository.createAccountPayable(accountPayable);
  }

  async updateAccountPayable(
    id: number,
    accountPayable: AccountPayable,
  ): Promise<any> {
    return this.accountPayableRepository.updateAccountPayable(
      id,
      accountPayable,
    );
  }
}
