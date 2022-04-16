import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSinhVienDto, UpdateSinhVienDto } from './dto/sinhVien.dto';
import { SinhVienService } from './sinhVien.service';
import { SinhVienDocument } from './schemas/sinhVien.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SinhVien')
@Controller('sinhViens')
export class SinhVienController {
  constructor(private readonly sinhVienService: SinhVienService) {}
  @Get()
  async getSinhViens(): Promise<SinhVienDocument[]> {
    return this.sinhVienService.getSinhViens();
  }

  @Get(':sinhVienId')
  async getSinhVienById(
    @Param('sinhVienId') sinhVienId: string,
  ): Promise<SinhVienDocument> {
    return this.sinhVienService.getSinhVienById(sinhVienId);
  }

  @Post()
  async createSinhVien(
    @Body() sinhVienDto: CreateSinhVienDto,
  ): Promise<SinhVienDocument> {
    return this.sinhVienService.createSinhVien(sinhVienDto);
  }

  @Patch(':sinhVienId')
  async updateSinhVien(
    @Param('sinhVienId') sinhVienId: string,
    @Body() sinhVienDto: UpdateSinhVienDto,
  ): Promise<SinhVienDocument> {
    return this.sinhVienService.updateSinhVien(sinhVienId, sinhVienDto);
  }

  @Delete(':sinhVienId')
  async deleteSinhVien(
    @Param('sinhVienId') sinhVienId: string,
  ): Promise<SinhVienDocument> {
    return this.sinhVienService.deleteSinhVien(sinhVienId);
  }
}
