import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { storage } from './file-helper';
import { UploadService } from './upload.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is not an image.');
    return this.uploadService.uploadAvatar(file.path);
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 20, storage))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const res_promises = files.map(
      (file) =>
        new Promise(async (resolve, reject) => {
          const result = this.uploadService.uploadMultiple(file.path);
          resolve(result);
        }),
    );
    return Promise.all(res_promises);
  }

  @Delete('avatar/:image')
  async deleteAvatar(@Param('image') image: string) {
    try {
      return await this.uploadService.deleteAvatar(
        'avatar/kscjckczsaguipccqgvl',
      );
    } catch (error) {
      console.log({ error });
    }
  }

  @Delete('images')
  deleteImages() {
    let imageIds = [
      'images/lwienpdr8haetmbk6y9z',
      'images/xcnuq2sqysrbjkzsolkr',
    ];
    return this.uploadService.deleteImages(imageIds);
  }
}
