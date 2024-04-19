import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { format, differenceInMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Attention, Turn, TypeTurn } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class TurnRepository {
  constructor(
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
      const procedureInsert = await this.typeTurnRepository.update(id, data);
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
            order: { name: 'DESC' },
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

  async getTurns(): Promise<ResponseDto> {
    try {
      return {
        data: await this.typeTurnRepository.manager.find(Turn, {
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
