import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SinhVien, SinhVienDocument } from './schemas/sinhVien.schema';
import { CreateSinhVienDto, UpdateSinhVienDto } from './dto/sinhVien.dto';

@Injectable()
export class SinhVienService {
  constructor(
    @InjectModel(SinhVien.name)
    private readonly sinhVienModel: Model<SinhVienDocument>,
  ) {}

  async getSinhViens(): Promise<SinhVienDocument[]> {
    return this.sinhVienModel.find().populate('maLop', 'tenLop id');
  }

  async getSinhVienById(sinhVienId: string): Promise<SinhVienDocument> {
    const sinhVien = await this.sinhVienModel.findById(sinhVienId);
    if (!sinhVien) throw new NotFoundException('Not found sinhVien.');
    return sinhVien;
  }

  async createSinhVien(
    sinhVienDto: CreateSinhVienDto,
  ): Promise<SinhVienDocument> {
    return this.sinhVienModel.create(sinhVienDto);
  }

  async updateSinhVien(
    sinhVienId: string,
    sinhVienDto: UpdateSinhVienDto,
  ): Promise<SinhVienDocument> {
    const sinhVien = await this.sinhVienModel.findByIdAndUpdate(
      sinhVienId,
      sinhVienDto,
      { new: true },
    );

    if (!sinhVien) throw new NotFoundException('Not found sinhVien.');
    return sinhVien;
  }

  async deleteSinhVien(sinhVienId: string): Promise<SinhVienDocument> {
    const sinhVien = await this.sinhVienModel.findByIdAndDelete(sinhVienId);
    if (!sinhVien) throw new NotFoundException('Not found sinhVien.');
    return sinhVien;
  }
}
