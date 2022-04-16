import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateKhoaDto, UpdateKhoaDto } from './dto/khoa.dto';
import { KhoaService } from './khoa.service';
import { KhoaDocument } from './schemas/khoa.schema';

@ApiTags('Khoa')
@Controller('khoas')
export class KhoaController {
  constructor(private readonly khoaService: KhoaService) {}

  @Get()
  async getKhoas(): Promise<KhoaDocument[]> {
    const khoas = await this.khoaService.getKhoas();
    return khoas;
  }

  @Get(':khoaId')
  async getKhoaById(@Param('khoaId') khoaId: string): Promise<KhoaDocument> {
    const khoa = await this.khoaService.getKhoaById(khoaId);
    return khoa;
  }

  @Post()
  async createKhoa(@Body() khoaDto: CreateKhoaDto): Promise<KhoaDocument> {
    const khoa = await this.khoaService.createKhoa(khoaDto);
    return khoa;
  }

  @Patch(':khoaId')
  async updateKhoa(
    @Param('khoaId') khoaId: string,
    @Body() khoaDto: UpdateKhoaDto,
  ): Promise<KhoaDocument> {
    const khoa = await this.khoaService.updateKhoa(khoaId, khoaDto);
    return khoa;
  }

  @Delete(':khoaId')
  async deleteKhoa(@Param('khoaId') khoaId: string): Promise<KhoaDocument> {
    const khoa = await this.khoaService.deleteKhoa(khoaId);
    return khoa;
  }
}
