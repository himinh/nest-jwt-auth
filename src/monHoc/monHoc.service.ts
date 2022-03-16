import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MonHoc, MonHocDocument } from 'src/monHoc/schemas/monHoc.schema';
import { CreateMonHocDto, UpdateMonHocDto } from 'src/monHoc/dto/monHoc.dto';

@Injectable()
export class MonHocService {
  constructor(
    @InjectModel(MonHoc.name)
    private readonly monHocModel: Model<MonHocDocument>,
  ) {}

  async getMonHocs(): Promise<MonHocDocument[]> {
    return this.monHocModel.find();
  }

  async getMonHocById(monHocId: string): Promise<MonHocDocument> {
    const monHoc = await this.monHocModel.findById(monHocId);
    if (!monHoc) throw new NotFoundException('Not found monHoc.');
    return monHoc;
  }

  async createMonHoc(monHocDto: CreateMonHocDto): Promise<MonHocDocument> {
    return this.monHocModel.create(monHocDto);
  }

  async updateMonHoc(
    monHocId: string,
    monHocDto: UpdateMonHocDto,
  ): Promise<MonHocDocument> {
    const monHoc = await this.monHocModel.findByIdAndUpdate(
      monHocId,
      monHocDto,
      { new: true },
    );
    if (!monHoc) throw new NotFoundException('Not found monHoc.');

    return monHoc;
  }

  async deleteMonHoc(monHocId: string): Promise<MonHocDocument> {
    const monHoc = await this.monHocModel.findByIdAndDelete(monHocId);
    if (!monHoc) throw new NotFoundException('Not found monHoc.');
    return monHoc;
  }
}
