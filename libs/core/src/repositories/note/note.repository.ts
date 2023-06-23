import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../../../../../apps/main/src/dto/shared/response.dto';
import { PaginationDto } from '../../../../../apps/main/src/dto/shared/pagination.dto';
import { Note } from 'sg/core/entities';
import { ListNoteDto } from '../../../../../apps/main/src/dto/config/listNote.dto';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  async createNote(data: Note): Promise<any> {
    try {
      const noteInsert = await this.noteRepository.manager.insert(Note, data);
      return {
        data: noteInsert.identifiers[0].id,
        msg: 'Nota Creada!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateNote(id: number, data: Note): Promise<any> {
    try {
      const noteInsert = await this.noteRepository.update(id, data);
      return { data: noteInsert.raw, msg: 'Nota Creada!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getNotes(params: ListNoteDto): Promise<ResponseDto> {
    try {
      const { page, limit } = params;
      const notes = await this.noteRepository.manager.find(Note, {
        where: { entityType: params.key, entityId: params.id },
        relations: ['createdBy'],
        // select: {
        //   id: true,
        //   title: true,
        //   createdBy: {
        //     select: ['id', 'firs'], // Selecciona solo los campos 'id' y 'name' de la relación 'createdBy'
        //   },
        // },

        // skip : ((page-1) * limit) || 0,
        // take: limit || 1000
      });

      return { data: notes, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }
}
