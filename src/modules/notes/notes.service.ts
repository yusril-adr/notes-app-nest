/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Note } from './entities/note.entity';
import {
  CreateParams,
  FindAllParams,
  FindAllResponse,
  FindOneParams,
  UpdateParams,
} from './types/notes.service';

@Injectable()
export class NotesService {
  async create(createParams: CreateParams): Promise<Note> {
    throw new Error('NOTES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async findAll(findAllParams: FindAllParams): Promise<FindAllResponse> {
    throw new Error('NOTES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async findOne(findOneParams: FindOneParams): Promise<Note | null> {
    throw new Error('NOTES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async updateByShortId(
    short_id: string,
    updateParams: UpdateParams,
  ): Promise<Note> {
    throw new Error('NOTES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async removeByShortId(short_id: string): Promise<void> {
    throw new Error('NOTES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
