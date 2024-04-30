import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindManyOptions, Repository } from 'typeorm';
import { differenceInMinutes } from 'date-fns';
import { Attention, Turn, TypeTurn } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { FilterListService } from 'sg/core/services/filters/filterList.service';
import { GetAccountPayableDto } from '../../../../../apps/main/src/modules/provider/dto/getAccountPayable.dto';
import { TypeFiltersDto } from '../../../../../apps/main/src/modules/provider/dto/typeFilters.dto';
import { GetTurnDto } from '../../../../../apps/main/src/modules/turn/dto/getTurnDto.dto';

const TYPES_FILTERS: TypeFiltersDto = {
  BOOLEAN: {
    isFinish: true,
  },
  CONTAINS: {
    fullName: true,
    company: true,
    document: true,
    // createdAt: true,
    // finishAt: true,
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
            order: { typeTurnId: 'DESC' },
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
      const query = `SELECT
                         a.type_turn_id as id,
                         tt.name as room,
                         l.name as type,
                         ROUND(AVG(a.total_time)::numeric, 2) AS average,
                         COUNT(*) AS quantity
                     FROM "CTM".attention a
                              INNER JOIN "CTM".type_turn tt ON tt.id = a.type_turn_id
                              INNER JOIN "CNFG".list l ON tt.type_turn_id = l.id
                     WHERE DATE_TRUNC('day', a.created_at::timestamp) = CURRENT_DATE
                     GROUP BY a.type_turn_id, tt.name, l.name;`;

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

  async createTurn(data: Turn): Promise<ResponseDto> {
    try {
      const createdAt = this.getCurrentDate();
      const procedureInsert = await this.turnRepository.manager.insert(Turn, {
        ...data,
        createdAt,
      });
      return {
        data: { id: procedureInsert.identifiers[0].id, createdAt },
        msg: 'Turno Creado!',
        code: 200,
      };
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

  // ATTENTION

  async createAttention(data: Attention): Promise<ResponseDto> {
    try {
      const attentionInsert = await this.turnRepository.manager.insert(
        Attention,
        { ...data, createdAt: this.getCurrentDate() },
      );
      return {
        data: attentionInsert.identifiers[0].id,
        msg: 'Atención Creada!',
        code: 200,
      };
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateAttention(id: number, data: Attention): Promise<ResponseDto> {
    try {
      const procedureInsert = await this.typeTurnRepository.manager.update(
        Attention,
        id,
        data,
      );
      return { data: procedureInsert.raw, msg: 'Nota Editada!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async finishAttention(
    id: number,
    data: Attention,
    isFinish: boolean,
  ): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const existingAttention = await entityManager.findOne(Attention, {
          where: { id },
          select: ['id', 'createdAt'],
        });
        if (!existingAttention) {
          return { success: false, msg: 'La atención no existe', code: 400 };
        }
        const finishAt = this.getCurrentDate();
        await entityManager.update(Attention, id, {
          ...data,
          finishAt,
          totalTime: differenceInMinutes(finishAt, existingAttention.createdAt),
        });

        if (isFinish) {
          const turnSelected = await entityManager.findOne(Turn, {
            where: { id: data.turnId },
            select: ['id', 'createdAt'],
          });
          await entityManager.update(Turn, data.turnId, {
            finishAt,
            totalTime: differenceInMinutes(finishAt, turnSelected.createdAt),
            isFinish: true,
          });
        }

        return { success: true, msg: 'Actualizado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar', data: e };
    }
  }

  async getAttentions(): Promise<ResponseDto> {
    try {
      return {
        data: await this.typeTurnRepository.manager.find(Attention, {
          order: { createdAt: 'DESC' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
