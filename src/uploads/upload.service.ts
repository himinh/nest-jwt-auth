import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadAvatar(filePath: string) {
    const options = {
      folder: 'avatar',
      width: 200,
      height: 200,
      crop: 'fill',
    };
    const result = await this.cloudinaryService.uploadImage(filePath, options);
    return result;
  }

  async uploadMultiple(filePath: string): Promise<object> {
    const options = {
      folder: 'images',
    };
    const result = await this.cloudinaryService.uploadImage(filePath, options);
    return {
      url: result.secure_url,
      id: result.public_id,
      thumb1: this.cloudinaryService.reSizeImage(result.public_id, 200, 200),
      main: this.cloudinaryService.reSizeImage(result.public_id, 500, 500),
      thumb2: this.cloudinaryService.reSizeImage(result.public_id, 300, 300),
    };
  }

  deleteAvatar(image_id: string) {
    return this.cloudinaryService.destroy(image_id);
  }

  deleteImages(imageIds: string[]) {
    return this.cloudinaryService.deleteResources(imageIds);
  }
}
