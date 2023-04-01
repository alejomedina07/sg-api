import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { ResponseDto } from "../../../../../apps/main/src/dto/shared/response.dto";
import { List, Rol }   from 'sg/core/entities';
import { GetListDto }  from '../../../../../apps/main/src/dto/config/getList.dto';

@Injectable()
export class ListRepository {
  constructor(
    @InjectRepository(List) private userRepository: Repository<List>,
  ) {}

  async createList(data: GetListDto): Promise<any> {
    try {
      const userInsert = await this.userRepository.manager.insert(List, data);
      return { data: userInsert.identifiers[0].id, msg: 'Item de la lista Creado exitosamente!', code: 200 }
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' }
    }
  }

  async getList(params: GetListDto): Promise<ResponseDto> {
    try {
      const { page, limit, key } = params;

      const [data, total] = key !== 'rol' ?
          await this.userRepository.manager.findAndCount( List, {
            select:['id', 'name', 'description', 'key'],
            where: { status: true, key },
            order: { name: 'ASC' },
            skip : ((page-1) * limit) || 0,
            take: limit || 1000
          }
        )
        : await this.userRepository.manager.findAndCount( Rol, {
            select:['id', 'name', 'description'],
            where: { status: true,  },
            order: { name: 'ASC' },
            skip : ((page-1) * limit) || 0,
            take: limit || 1000
          }
        );

      return { data, total, msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      return { code: 500, msg: 'Error al obtener' }
    }
  }

  async getAllOptions(): Promise<ResponseDto> {

    try {
      const results = await this.userRepository.createQueryBuilder('list')
        .select('DISTINCT list.key', 'key')
        .orderBy('key')
        .getRawMany();

      return { data: results.map(result => result.key), msg: 'Obtenido correctamente!', code: 201 } ;

    } catch (e) {
      throw e;
    }

  }


}
