import { Database } from '@global/types/supabase-types';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { StorageService } from '@global/services/storage/storage.service';
import { SupabaseProvider } from './supabase.provider';

@Injectable()
export class SupabaseStorageService extends StorageService {
  private readonly supabase: SupabaseClient<Database>;
  private readonly bucketName: string;
  constructor(
    private readonly supabaseProvider: SupabaseProvider,
    private readonly configService: ConfigService,
  ) {
    super();
    this.bucketName = this.configService.get('SUPABASE_STORAGE_BUCKET');
    this.supabase = this.supabaseProvider.init();
  }

  async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(path, file.buffer, {
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from(this.bucketName).getPublicUrl(data.path);

    return publicUrl;
  }

  async deleteFiles(paths: string[]): Promise<void> {
    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .remove(paths);

    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
