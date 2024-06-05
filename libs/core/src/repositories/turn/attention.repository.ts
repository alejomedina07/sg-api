import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, EntityManager, FindManyOptions, Repository } from 'typeorm';
import { differenceInMinutes } from 'date-fns';
import { Attention, Turn, TypeTurn } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { FilterListService } from 'sg/core/services/filters/filterList.service';
import { TypeFiltersDto } from '../../../../../apps/main/src/modules/provider/dto/typeFilters.dto';
import { GetTurnDto } from '../../../../../apps/main/src/modules/turn/dto/getTurnDto.dto';
import { GetAttentionDto } from '../../../../../apps/main/src/modules/turn/dto/getAttentionDto.dto';
import { ReassignAttentionDto } from '../../../../../apps/main/src/modules/turn/dto/reassignAttention.dto';

const TYPES_FILTERS: TypeFiltersDto = {
  EQUAL: {
    typeTurnId: true,
  },
  BOOLEAN: {
    isFinish: true,
  },
  DATE: {
    createdAt: true,
  },
  CONTAINS: {
    fullName: true,
    company: true,
    document: true,
  },
  NUMBERS: {
    id: true,
    // typeTurnId: true,
  },
  RELATION: {
    attentBy: 'first_name',
    turn: 'fullName',
  },
};

@Injectable()
export class AttentionRepository {
  constructor(
    private filterListService: FilterListService,
    @InjectRepository(Attention)
    private attentionRepository: Repository<Attention>,
    private readonly entityManager: EntityManager,
  ) {}

  getCurrentDate(): Date {
    return new Date();
  }

  async createAttention(data: Attention): Promise<ResponseDto> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const attention = await entityManager.findOne(Attention, {
          where: { turnId: data.turnId, typeTurnId: data.typeTurnId },
        });
        await entityManager.save(Attention, {
          ...attention,
          attendedAt: this.getCurrentDate(),
        });

        return {
          data: attention.id,
          success: true,
          msg: 'Turno Creado!',
          code: 200,
        };
      });
    } catch (e) {
      console.log(666, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateAttention(id: number, data: Attention): Promise<ResponseDto> {
    try {
      const procedureInsert = await this.attentionRepository.manager.update(
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

  async reassignAttention(data: ReassignAttentionDto): Promise<ResponseDto> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const attention = await entityManager.findOne(Attention, {
          where: { turnId: data.turnId, typeTurnId: data.oldRoomId },
        });

        if (attention) {
          await entityManager.save(Attention, {
            ...attention,
            typeTurnId: data.newRoomId,
          });
        } else {
          const oldAttention = await entityManager.findOne(Attention, {
            where: { turnId: data.turnId, typeTurnId: data.newRoomId },
          });
          if (!oldAttention) throw ' Atención no encontrada';
        }

        return {
          data: attention.id,
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

  async finishAttention(
    id: number,
    data: Attention,
    isFinish: boolean,
  ): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const existingAttention = await entityManager.findOne(Attention, {
          where: { id },
          // select: ['id', 'createdAt'],
          select: ['id', 'createdAt', 'attendedAt'],
        });
        if (!existingAttention) {
          return { success: false, msg: 'La atención no existe', code: 400 };
        }
        const finishAt = this.getCurrentDate();
        await entityManager.update(Attention, id, {
          ...data,
          finishAt,
          totalTime: differenceInMinutes(
            finishAt,
            existingAttention.attendedAt,
          ),
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
      console.log(12345, e);
      return { code: 500, msg: 'Error al intentar guardar', data: e };
    }
  }

  async getAttentions(params: GetAttentionDto): Promise<ResponseDto> {
    try {
      const { page = 0, limit = 1000, filters, order } = params;

      // console.log(888, filters);
      // const dateFilter = new Date(filters.createdAt);
      // let nextDay = new Date(dateFilter);
      // nextDay.setDate(nextDay.getDate() + 1); // Ajustar para incluir todo el día
      // nextDay.setHours(0, 0, 0, 0);
      // const data = await this.attentionRepository.find({
      //   where: { createdAt: Between(dateFilter, nextDay), typeTurnId: 4 },
      // });
      //
      // console.log(data);
      //
      // return { data, msg: 'Obtenido correctamente!', code: 201 };

      let queryOptions: FindManyOptions<Attention> = {
        relations: ['attentBy', 'turn', 'typeTurn'],
        order: order || { id: 'desc' },
        skip: (page - 1) * limit || 0,
        take: limit || 1000,
      };

      queryOptions = this.filterListService.getQueryFilters(
        filters,
        TYPES_FILTERS,
        queryOptions,
      );

      const [data, total] = await this.attentionRepository.manager.findAndCount(
        Attention,
        queryOptions,
      );

      console.log(9999, data);
      return { data, total, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
