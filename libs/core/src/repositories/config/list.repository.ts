import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { List, Rol } from 'sg/core/entities';
import { GetListDto } from '../../../../../apps/main/src/modules/config/dto/getList.dto';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async createList(data: GetListDto): Promise<any> {
    try {
      const userInsert = await this.listRepository.manager.insert(List, data);
      return {
        data: userInsert.identifiers[0].id,
        msg: 'Item de la lista Creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateList(id: number, data: GetListDto): Promise<any> {
    try {
      const userInsert = await this.listRepository.update(id, data);
      return {
        data: userInsert.raw,
        msg: 'Item de la lista Creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getList(params: GetListDto): Promise<ResponseDto> {
    try {
      const { page, limit, key, getAll } = params;

      let where = { status: true, key };
      if (getAll) delete where.status;
      const [data, total] =
        key !== 'rol'
          ? await this.listRepository.manager.findAndCount(List, {
              select: ['id', 'name', 'description', 'key', 'status'],
              where,
              order: { name: 'ASC' },
              skip: (page - 1) * limit || 0,
              take: limit || 1000,
            })
          : await this.listRepository.manager.findAndCount(Rol, {
              select: ['id', 'name', 'description', 'status'],
              where: { status: true },
              order: { name: 'ASC' },
              skip: (page - 1) * limit || 0,
              take: limit || 1000,
            });

      return { data, total, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  async getAllOptions(): Promise<ResponseDto> {
    try {
      const results = await this.listRepository
        .createQueryBuilder('list')
        .select('DISTINCT list.key', 'key')
        .orderBy('key')
        .getRawMany();

      return {
        data: results.map((result) => result.key),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      throw e;
    }
  }
}
