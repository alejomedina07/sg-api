import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, Repository } from 'typeorm';
import { Attention, Turn, TypeTurn } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { FilterListService } from 'sg/core/services/filters/filterList.service';
import { TypeFiltersDto } from '../../../../../apps/main/src/modules/provider/dto/typeFilters.dto';
import { GetTurnDto } from '../../../../../apps/main/src/modules/turn/dto/getTurnDto.dto';
import { format } from 'date-fns';

const TYPES_FILTERS: TypeFiltersDto = {
  BOOLEAN: {
    isFinish: true,
  },
  CONTAINS: {
    fullName: true,
    company: true,
    document: true,
  },
  NUMBERS: {
    id: true,
    createdById: true,
  },
  RELATION: {
    createdBy: 'first_name',
  },
};

@Injectable()
export class TurnRepository {
  constructor(
    private filterListService: FilterListService,
    @InjectRepository(TypeTurn)
    private typeTurnRepository: Repository<TypeTurn>,
    @InjectRepository(Turn)
    private turnRepository: Repository<Turn>,
    private readonly entityManager: EntityManager,
  ) {}

  getCurrentDate(): Date {
    // const bogotaTimeZone = 'America/Bogota';
    // const currentDate = new Date();
    // const bogotaDate = format(
    //   utcToZonedTime(currentDate, bogotaTimeZone),
    //   'yyyy-MM-dd HH:mm:ss',
    // );
    // return new Date(bogotaDate);
    return new Date();
  }

  // type-turn

  async createTypeTurn(data: TypeTurn): Promise<ResponseDto> {
    try {
      const procedureInsert = await this.typeTurnRepository.manager.insert(
        TypeTurn,
        data,
      );
      return {
        data: procedureInsert.identifiers[0].id,
        msg: 'Procedimiento Creada!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateTypeTurn(id: number, data: TypeTurn): Promise<ResponseDto> {
    try {
      const procedureInsert = await this.typeTurnRepository.update(id, {
        name: data.name,
        status: data.status,
        typeTurnId: data.typeTurnId,
        description: data.description,
      });
      return { data: procedureInsert.raw, msg: 'Nota Editada!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getTypeTurns(list: boolean): Promise<ResponseDto> {
    try {
      let data = list
        ? await this.typeTurnRepository.manager.find(TypeTurn, {
            where: { status: true },
            select: ['name', 'description', 'id', 'typeTurn', 'typeTurnId'],
            relations: ['typeTurn'],
            order: { name: 'ASC' },
          })
        : await this.typeTurnRepository.manager.find(TypeTurn, {
            relations: ['typeTurn'],
            order: { createdAt: 'DESC' },
          });
      if (list) {
        data = data.map((item) => {
          return { ...item, typeName: item.typeTurn.name };
        });
      }
      return {
        data,
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  async getCountTypeTurns(): Promise<ResponseDto> {
    try {
      // const query = `SELECT
      //                    a.type_turn_id as id,
      //                    tt.name as room,
      //                    ROUND(AVG(a.total_time)::numeric, 2) AS average,
      //                    COUNT(CASE WHEN a.finish_at IS NULL THEN 1 END) AS pending,
      //                    COUNT(CASE WHEN a.finish_at IS NOT NULL THEN 1 END) AS attended,
      //                    SUM(CASE WHEN t.double_turn THEN 2 ELSE 1 END) AS total
      //                FROM "CTM".attention a
      //                         INNER JOIN "CTM".type_turn tt ON tt.id = a.type_turn_id
      //                         INNER JOIN "CTM".turn t ON t.id = a.turn_id
      //                WHERE DATE_TRUNC('day', a.created_at::timestamp) = CURRENT_DATE
      //                GROUP BY a.type_turn_id, tt.name
      //                ORDER BY tt.name ASC;`;

      const startDate = format(new Date(), 'yyyy-MM-dd') + ' 00:00:00',
        endDate = format(new Date(), 'yyyy-MM-dd') + ' 23:59:59';

      const query = `SELECT
                         a.type_turn_id as id,
                         tt.name as room,
                         ROUND(AVG(a.total_time)::numeric, 2) AS average,
                         COUNT(CASE WHEN a.finish_at IS NULL THEN 1 END) AS pending,
                         COUNT(CASE WHEN a.finish_at IS NOT NULL THEN 1 END) AS attended,
                         SUM(CASE WHEN t.double_turn THEN 2 ELSE 1 END) AS total
                     FROM "CTM".attention a
                              INNER JOIN "CTM".type_turn tt ON tt.id = a.type_turn_id
                              INNER JOIN "CTM".turn t ON t.id = a.turn_id
                     WHERE a.created_at >= '${startDate}' AND a.created_at <= '${endDate}'
                     GROUP BY a.type_turn_id, tt.name
                     ORDER BY tt.name ASC;`;
      console.log(6666, query);
      return {
        data: await this.typeTurnRepository.query(query),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  // TURN

  async createTurn(data: Turn, typeTurns: number[]): Promise<ResponseDto> {
    try {
      console.log(777, data);
      const createdAt = this.getCurrentDate();
      return this.entityManager.transaction(async (entityManager) => {
        const turnSave = await entityManager.insert(Turn, {
          ...data,
          createdAt,
        });
        console.log(turnSave.identifiers[0].id);
        const turnId = turnSave.identifiers[0].id;
        const attentionsToInsert = typeTurns.map((typeTurnId) => ({
          turnId,
          typeTurnId,
        }));

        await entityManager.insert(Attention, attentionsToInsert);

        return {
          data: { id: turnId, createdAt },
          success: true,
          msg: 'Turno Creado!',
          code: 200,
        };
      });
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateTurn(id: number, data: Turn): Promise<ResponseDto> {
    try {
      const procedureInsert = await this.typeTurnRepository.manager.update(
        Turn,
        id,
        data,
      );
      return { data: procedureInsert.raw, msg: 'Nota Editada!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getTurns(params: GetTurnDto): Promise<ResponseDto> {
    try {
      const { page = 0, limit = 1000, filters, order } = params;
      let queryOptions: FindManyOptions<Turn> = {
        relations: ['createdBy'],
        order: order || { id: 'desc' },
        skip: (page - 1) * limit || 0,
        take: limit || 1000,
      };
      queryOptions = this.filterListService.getQueryFilters(
        filters,
        TYPES_FILTERS,
        queryOptions,
      );

      const [data, total] = await this.typeTurnRepository.manager.findAndCount(
        Turn,
        queryOptions,
      );

      return { data, total, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  // ATTENTION

  async getAttention(turnId: number): Promise<ResponseDto> {
    try {
      const data = await this.turnRepository.manager.find(Attention, {
        where: { turnId },
        relations: ['typeTurn', 'attentBy'],
      });

      return { data, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
