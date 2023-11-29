import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NoteService } from '../../services/note/note.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { ListNoteDto } from '../../dto/listNote.dto';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { CreateNoteDto } from '../../dto/createNote.dto';

@ApiBearerAuth()
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getNotes(@Query() params: ListNoteDto): Promise<ResponseDto> {
    return await this.noteService.getNotes(params);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createNote(@Body() note: CreateNoteDto): Promise<ResponseDto> {
    const response = await this.noteService.createNote(note);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateNote(
    @Param('id') id: number,
    @Body() note: CreateNoteDto,
  ): Promise<ResponseDto> {
    const response = await this.noteService.updateNote(id, note);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
