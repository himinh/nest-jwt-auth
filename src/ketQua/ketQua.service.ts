import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { KetQua, KetQuaDocument } from './schemas/ketQua.schema';
import { CreateKetQuaDto, UpdateKetQuaDto } from './dto/ketQua.dto';

@Injectable()
export class KetQuaService {
  constructor(
    @InjectModel(KetQua.name)
    private readonly ketQuaModel: Model<KetQuaDocument>,
  ) {}

  // Get all ketQuas
  async getKetQuas(): Promise<KetQuaDocument[]> {
    return this.ketQuaModel.find();
  }

  // Get ketQua by ketQuaId
  async getKetQuaById(ketQuaId: string): Promise<KetQuaDocument> {
    const ketQua = await this.ketQuaModel.findById(ketQuaId);
    if (!ketQua) throw new NotFoundException('Not found ketQua.');
    return ketQua;
  }

  // Create ketQua
  async createKetQua(ketQuaDto: CreateKetQuaDto): Promise<KetQuaDocument> {
    return this.ketQuaModel.create(ketQuaDto);
  }

  // Update ketQua by ketQuaId
  async updateKetQua(
    ketQuaId: string,
    ketQuaDto: UpdateKetQuaDto,
  ): Promise<KetQuaDocument> {
    const ketQua = await this.ketQuaModel.findByIdAndUpdate(
      ketQuaId,
      ketQuaDto,
      { new: true },
    );

    if (!ketQua) throw new NotFoundException('Not found ketQua.');
    return ketQua;
  }

  // Delete ketQua by ketQuaId
  async deleteKetQua(ketQuaId: string): Promise<KetQuaDocument> {
    const ketQua = await this.ketQuaModel.findByIdAndDelete(ketQuaId);
    if (!ketQua) throw new NotFoundException('Not found ketQua.');
    return ketQua;
  }
}
