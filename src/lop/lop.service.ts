import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Lop, LopDocument } from './schemas/lop.schema';
import { CreateLopDto, UpdateLopDto } from './dto/lop.dto';

@Injectable()
export class LopService {
  constructor(
    @InjectModel(Lop.name) private readonly lopModel: Model<LopDocument>,
  ) {}

  async getLops(): Promise<LopDocument[]> {
    return this.lopModel.find();
  }

  async getLopById(lopId: string): Promise<LopDocument> {
    const lop = await this.lopModel.findById(lopId);
    if (!lop) throw new NotFoundException('Not found lop.');
    return lop;
  }

  async createLop(lopDto: CreateLopDto): Promise<LopDocument> {
    return this.lopModel.create(lopDto);
  }

  async updateLop(lopId: string, lopDto: UpdateLopDto): Promise<LopDocument> {
    const lop = await this.lopModel.findByIdAndUpdate(lopId, lopDto, {
      new: true,
    });

    if (!lop) throw new NotFoundException('Not found lop.');
    return lop;
  }

  async deleteLop(lopId: string): Promise<LopDocument> {
    const lop = await this.lopModel.findByIdAndDelete(lopId);
    if (!lop) throw new NotFoundException('Not found lop.');
    return lop;
  }
}
