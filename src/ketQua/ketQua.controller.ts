import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateKetQuaDto, UpdateKetQuaDto } from './dto/ketQua.dto';
import { KetQuaService } from './ketQua.service';
import { KetQuaDocument } from './schemas/ketQua.schema';

@Controller('ketQuas')
export class KetQuaController {
  constructor(private readonly ketQuaService: KetQuaService) {}
  @Get()
  async getKetQuas(): Promise<KetQuaDocument[]> {
    return this.ketQuaService.getKetQuas();
  }

  @Get(':ketQuaId')
  async getKetQuaById(
    @Param('ketQuaId') ketQuaId: string,
  ): Promise<KetQuaDocument> {
    return this.ketQuaService.getKetQuaById(ketQuaId);
  }

  @Post()
  async createKetQua(
    @Body() ketQuaDto: CreateKetQuaDto,
  ): Promise<KetQuaDocument> {
    return this.ketQuaService.createKetQua(ketQuaDto);
  }

  @Patch(':ketQuaId')
  async updateKetQua(
    @Param('ketQuaId') ketQuaId: string,
    @Body() ketQuaDto: UpdateKetQuaDto,
  ): Promise<KetQuaDocument> {
    return this.ketQuaService.updateKetQua(ketQuaId, ketQuaDto);
  }

  @Delete(':ketQuaId')
  async deleteKetQua(
    @Param('ketQuaId') ketQuaId: string,
  ): Promise<KetQuaDocument> {
    return this.ketQuaService.deleteKetQua(ketQuaId);
  }
}
