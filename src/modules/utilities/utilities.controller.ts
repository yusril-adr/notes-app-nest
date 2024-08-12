import {
  Controller,
  Post,
  Body,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { StorageService } from '@global/services/storage/storage.service';
import * as wrapper from '@helpers/utils/wrapper';
import randomUUID from '@helpers/utils/shortIdGenerator';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from '@global/types/response.type';
import { AccessTokenGuard } from '@guards/access-token.guards';

import { UploadFilesDto } from './dto/upload-files';
import { DeleteFilesDto } from './dto/delete-files';

@ApiTags('utilities')
@Controller({
  path: 'utilities',
  version: '1',
})
export class UtilitiesController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AccessTokenGuard)
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() uploadFilesDto: UploadFilesDto,
  ): Promise<Response<string[]>> {
    const { path } = uploadFilesDto;
    const urls = await Promise.all(
      files.map(async (file) => {
        const ext = file.originalname.split('.').at(-1);
        const filename = `${randomUUID()}.${ext}`;

        const fullPath = `${path}/${filename}`;

        const url = await this.storageService.uploadFile(fullPath, file);
        return url;
      }),
    );

    return wrapper.response({ data: urls, message: 'Upload files Success' });
  }

  @Delete('upload')
  @UseGuards(AccessTokenGuard)
  async deleteFiles(@Body() deleteFilesDto: DeleteFilesDto): Promise<Response> {
    const { urls } = deleteFilesDto;
    const formatedUrls = urls.map((url) => {
      return url.split('/').slice(8).join('/');
    });

    await this.storageService.deleteFiles(formatedUrls);

    return wrapper.response({
      message: 'Delete files Success',
    });
  }
}
