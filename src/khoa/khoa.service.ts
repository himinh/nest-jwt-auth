import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKhoaDto, UpdateKhoaDto } from './dto/khoa.dto';
import { Khoa, KhoaDocument } from './schemas/khoa.schema';

@Injectable()
export class KhoaService {
  constructor(
    @InjectModel(Khoa.name) private readonly khoaModel: Model<KhoaDocument>,
  ) {}

  async getKhoas(): Promise<KhoaDocument[]> {
    return this.khoaModel.find();
  }

  async getKhoaById(khoaId: string): Promise<KhoaDocument> {
    const khoa = await this.khoaModel.findById(khoaId);
    if (!khoa) throw new NotFoundException('Not found khoa.');
    return khoa;
  }

  async createKhoa(khoaDto: CreateKhoaDto): Promise<KhoaDocument> {
    return this.khoaModel.create(khoaDto);
  }

  async updateKhoa(
    khoaId: string,
    khoaDto: UpdateKhoaDto,
  ): Promise<KhoaDocument> {
    const khoa = await this.khoaModel.findByIdAndUpdate(khoaId, khoaDto, {
      new: true,
    });
    if (!khoa) throw new NotFoundException('Not found khoa.');
    return khoa;
  }

  async deleteKhoa(khoaId: string): Promise<KhoaDocument> {
    const khoa = await this.khoaModel.findByIdAndDelete(khoaId);
    if (!khoa) throw new NotFoundException('Not found khoa.');
    return khoa;
  }
}
