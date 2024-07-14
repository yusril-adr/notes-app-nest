/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    throw new Error('UTILITIES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async deleteFiles(path: string[]): Promise<void> {
    throw new Error('UTILITIES_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
