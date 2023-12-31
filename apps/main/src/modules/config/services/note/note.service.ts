import { Injectable } from '@nestjs/common';
import { NoteRepository } from 'sg/core/repositories/note/note.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { Note } from 'sg/core/entities';
import { ListNoteDto } from '../../dto/listNote.dto';
import { CreateNoteDto } from '../../dto/createNote.dto';

@Injectable()
export class NoteService {
  constructor(private noteRepository: NoteRepository) {}

  async getNotes(params: ListNoteDto): Promise<ResponseDto> {
    return this.noteRepository.getNotes(params);
  }

  async createNote(note: CreateNoteDto): Promise<any> {
    return this.noteRepository.createNote(note);
  }

  async updateNote(id: number, note: Note): Promise<any> {
    return this.noteRepository.updateNote(id, note);
  }
}
