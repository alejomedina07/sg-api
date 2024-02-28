import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindManyOptions,
  FindOperator,
  ILike,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { AccountPayable, Provider } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { GetAccountPayableDto } from '../../../../../apps/main/src/modules/provider/dto/getAccountPayable.dto';

const TYPES_FILTERS = {
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
};

@Injectable()
export class AccountPayableRepository {
  constructor(
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

      if (filters) {
        const whereConditions: Array<{
          [key: string]:
            | FindOperator<any>
            | { [key: string]: FindOperator<any> | any };
        }> = [];
        let whereWithAnd = {};
        for (let key in filters) {
          if (filters.hasOwnProperty(key)) {
            if (TYPES_FILTERS.CONTAINS[key]) {
              whereConditions.push({ [key]: ILike(`%${filters[key]}%`) });
              whereWithAnd[key] = ILike(`%${filters[key]}%`);
            } else if (TYPES_FILTERS.NUMBERS[key]) {
              whereConditions.push({
                [key]: MoreThanOrEqual(parseInt(filters[key])),
              });
              whereWithAnd[key] = MoreThanOrEqual(parseInt(filters[key]));
            } else if (TYPES_FILTERS.BOOLEAN[key]) {
              whereConditions.push({ [key]: Equal(filters[key] === 'true') });
              whereWithAnd[key] = Equal(filters[key] === 'true');
            }
          }
        }

        if (filters.provider) {
          if (filters.type === 'AND')
            whereWithAnd['provider'] = { name: ILike(`%${filters.provider}%`) };
          else
            whereConditions.push({
              provider: { name: ILike(`%${filters.provider}%`) },
            });
        }

        if (filters.type === 'AND') {
          queryOptions.where =
            Object.keys(whereWithAnd).length > 0 ? whereWithAnd : undefined;
        } else {
          queryOptions.where =
            whereConditions.length > 0 ? whereConditions : undefined;
        }
      }
      const [data, total] =
        await this.accountPayableRepository.manager.findAndCount(
          AccountPayable,
          queryOptions,
        );

      return {
        data,
        total,
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
