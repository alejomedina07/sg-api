import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { Procedure, ProcedureProcedure } from 'sg/core/entities';

@Injectable()
export class ProcedureRepository {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
  ) {}

  async createProcedure(data: Procedure): Promise<any> {
    try {
      const procedureInsert = await this.procedureRepository.manager.insert(
        Procedure,
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

  async assignChildProcedure(data: ProcedureProcedure[]): Promise<any> {
    try {
      const procedureInsert = await this.procedureRepository.manager.insert(
        ProcedureProcedure,
        data,
      );
      return {
        data: procedureInsert.identifiers[0].id,
        msg: 'Procedimiento Asignado!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateProcedure(id: number, data: Procedure): Promise<any> {
    try {
      const procedureInsert = await this.procedureRepository.update(id, data);
      return { data: procedureInsert.raw, msg: 'Nota Editada!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getProcedures(): Promise<ResponseDto> {
    try {
      return {
        data: await this.procedureRepository.manager.find(Procedure, {
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

  async getProcedureChild(id: number): Promise<ResponseDto> {
    try {
      const parent = await this.procedureRepository.manager.findOne(Procedure, {
        where: { id },
      });
      const children = await this.procedureRepository.manager.find(
        ProcedureProcedure,
        {
          relations: ['procedureIdChildren'],
          where: { procedureIdParentId: id },
        },
      );

      return {
        data: {
          ...parent,
          children: children.map((item) => item.procedureIdChildren),
        },
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
