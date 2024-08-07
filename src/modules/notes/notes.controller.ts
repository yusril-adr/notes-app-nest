import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as wrapper from '@helpers/utils/wrapper';
import randomUUID from '@helpers/utils/shortIdGenerator';
import { AccessTokenGuard } from '@guards/access-token.guards';
import { RequestUser } from '@global/types/request-user.types';
import { PaginationResponse, Response } from '@global/types/response.types';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { FindNoteDto } from './dto/find-note.dto';

@ApiTags('notes')
@Controller({
  path: 'notes',
  version: '1',
})
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @Request() request: RequestUser,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Response<Note>> {
    const short_id = randomUUID();
    const note = await this.notesService.create({
      ...createNoteDto,
      short_id,
      user_id: request.user.id,
    });

    return wrapper.response({
      data: note,
      message: 'Create Note Success',
    });
  }

  @Get()
  async findAll(
    @Query() findNoteDto: FindNoteDto,
  ): Promise<PaginationResponse<Note[]>> {
    const { row, page, search_value, search_key } = findNoteDto;
    const search =
      search_key !== null && search_value !== null
        ? { [search_key]: search_value }
        : null;

    const { data: notes, count } = await this.notesService.findAll({
      row,
      page,
      search,
    });

    return wrapper.paginationResponse({
      data: notes,
      message: 'Find Notes Success',
      meta: {
        totalData: count,
        totalPage: Math.ceil(count / row) | 0,
        totalView: notes.length,
        currentPage: page,
        maxView: row,
      },
    });
  }

  @Get(':short_id')
  async findOneByShortId(
    @Param('short_id') short_id: string,
  ): Promise<Response<Note | null>> {
    const note = await this.notesService.findOne({ short_id });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return wrapper.response({
      data: note,
      message: 'Find Note By Short Id Success',
    });
  }

  @Put(':short_id')
  @UseGuards(AccessTokenGuard)
  async updateByShortId(
    @Request() request: RequestUser,
    @Param('short_id') short_id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Response<Note>> {
    const { id: user_id } = request.user;

    const oldNote = await this.notesService.findOne({ short_id });

    if (!oldNote) {
      throw new NotFoundException('Note not found');
    }

    if (user_id !== oldNote.user.id) {
      throw new ForbiddenException('Action not permitted');
    }

    const updatedNote = await this.notesService.updateByShortId(
      short_id,
      updateNoteDto,
    );

    return wrapper.response({
      data: updatedNote,
      message: 'Update Note By Short Id Successd',
    });
  }

  @Delete(':short_id')
  @UseGuards(AccessTokenGuard)
  async removeByShortId(
    @Request() request: RequestUser,
    @Param('short_id') short_id: string,
  ): Promise<Response> {
    const { id: user_id } = request.user;

    const oldNote = await this.notesService.findOne({ short_id });

    if (!oldNote) {
      throw new NotFoundException('Note not found');
    }

    if (user_id !== oldNote.user.id) {
      throw new ForbiddenException('Action not permitted');
    }

    await this.notesService.removeByShortId(short_id);

    return wrapper.response({
      message: 'Delete Note By Short Id Successd',
    });
  }
}
