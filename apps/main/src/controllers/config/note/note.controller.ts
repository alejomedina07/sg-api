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
import { NoteService } from '../../../services/config/note/note.service';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../dto/shared/response.dto';
import { ListNoteDto } from '../../../dto/config/listNote.dto';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { CreateNoteDto } from '../../../dto/config/createNote.dto';

@ApiBearerAuth()
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers(@Query() params: ListNoteDto): Promise<ResponseDto> {
    return await this.noteService.getNotes(params);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createUser(@Body() note: CreateNoteDto): Promise<ResponseDto> {
    const response = await this.noteService.createNote(note);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() note: CreateNoteDto,
  ): Promise<ResponseDto> {
    const response = await this.noteService.updateNote(id, note);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
