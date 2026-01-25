import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { StorageService } from './storage.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME = ['image/', 'application/pdf', 'video/'];

@Controller('admin/uploads')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, cb) => {
        const isAllowed = ALLOWED_MIME.some((prefix) => file.mimetype.startsWith(prefix));
        if (!isAllowed) {
          return cb(new BadRequestException('Unsupported file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File, @Body('folder') folder?: string) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.storageService.upload(file, folder);
  }
}
