import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { AccountPayable, Provider } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { GetAccountPayableDto } from '../../../../../apps/main/src/modules/provider/dto/getAccountPayable.dto';
import { TypeFiltersDto } from '../../../../../apps/main/src/modules/provider/dto/typeFilters.dto';
import { FilterListService } from 'sg/core/services/filters/filterList.service';

const TYPES_FILTERS: TypeFiltersDto = {
  BOOLEAN: {
    paid: true,
  },
  CONTAINS: {
    description: true,
    reference: true,
    amount: true,
  },
  NUMBERS: {
    id: true,
    providerId: true,
  },
  RELATION: {
    provider: 'name',
  },
};

@Injectable()
export class AccountPayableRepository {
  constructor(
    private filterListService: FilterListService,
    @InjectRepository(AccountPayable)
    private accountPayableRepository: Repository<AccountPayable>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async createAccountPayable(accountPayable: AccountPayable): Promise<any> {
    try {
      const procedureInsert =
        await this.accountPayableRepository.manager.insert(
          AccountPayable,
          accountPayable,
        );
      return {
        data: procedureInsert.identifiers[0].id,
        msg: 'Cuenta por pagar Creada!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateAccountPayable(id: number, data: AccountPayable): Promise<any> {
    try {
      const providerInsert = await this.accountPayableRepository.update(
        id,
        data,
      );
      return {
        data: providerInsert.raw,
        msg: 'Cuenta por pagar actualizada exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getAccountPayables(params: GetAccountPayableDto): Promise<ResponseDto> {
    try {
      const { page = 0, limit = 1000, filters, order } = params;

      let queryOptions: FindManyOptions<AccountPayable> = {
        relations: ['createdBy', 'provider'],
        order: order || { id: 'desc' },
        skip: (page - 1) * limit || 0,
        take: limit || 1000,
      };
      queryOptions = this.filterListService.getQueryFilters(
        filters,
        TYPES_FILTERS,
        queryOptions,
      );

      const [data, total] =
        await this.accountPayableRepository.manager.findAndCount(
          AccountPayable,
          queryOptions,
        );

      return { data, total, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  async getAccountPayableById(id: number): Promise<ResponseDto> {
    try {
      return {
        data: await this.accountPayableRepository.manager.findOne(
          AccountPayable,
          {
            where: { id },
            relations: [
              'paymentAccountPayables',
              'paymentAccountPayables.payment',
              'paymentAccountPayables.payment.createdBy',
              'provider',
              'createdBy',
            ],
          },
        ),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
