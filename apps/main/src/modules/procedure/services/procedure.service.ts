import { Injectable } from '@nestjs/common';
import { ProcedureRepository } from 'sg/core/repositories/procedure/procedure.repository';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { Procedure } from 'sg/core/entities';
import { CreateProcedureDto } from '../dto/createProcedure.dto';
import { AssignChildProcedureDto } from '../dto/assignChildProcedure.dto';

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async getProcedures(): Promise<ResponseDto> {
    return this.procedureRepository.getProcedures();
  }
  async getProcedureChild(id: number): Promise<ResponseDto> {
    return this.procedureRepository.getProcedureChild(id);
  }

  async createProcedure(procedure: CreateProcedureDto): Promise<any> {
    return this.procedureRepository.createProcedure(procedure);
  }

  async updateProcedure(id: number, procedure: Procedure): Promise<any> {
    return this.procedureRepository.updateProcedure(id, procedure);
  }

  async assignChildProcedure(
    procedures: AssignChildProcedureDto[],
  ): Promise<any> {
    return this.procedureRepository.assignChildProcedure(procedures);
  }
}
