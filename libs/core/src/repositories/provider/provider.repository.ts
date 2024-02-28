import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Provider } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class ProviderRepository {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async createProvider(provider: Provider): Promise<any> {
    try {
      console.log(777, provider);
      const procedureInsert = await this.providerRepository.manager.insert(
        Provider,
        provider,
      );
      return {
        data: procedureInsert.identifiers[0].id,
        msg: 'Proveedor Creado!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateProvider(id: number, data: Provider): Promise<any> {
    try {
      const providerInsert = await this.providerRepository.update(id, data);
      return {
        data: providerInsert.raw,
        msg: 'Proveedor actualizado exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getProviders(list: boolean): Promise<ResponseDto> {
    try {
      let optionsQuery: FindManyOptions<Provider> = list
        ? {
            select: ['id', 'name'],
            where: { status: true },
            order: { name: 'desc' },
          }
        : {
            relations: ['createdBy'],
            order: { id: 'desc' },
          };

      return {
        data: await this.providerRepository.manager.find(
          Provider,
          optionsQuery,
        ),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getProviderById(id: number): Promise<ResponseDto> {
    try {
      return {
        data: await this.providerRepository.manager.findOne(Provider, {
          where: { id },
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
