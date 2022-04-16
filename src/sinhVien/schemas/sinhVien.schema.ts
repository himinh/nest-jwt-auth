// SinhVien(MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong, Tinh)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Lop } from 'src/lop/schemas/lop.schema';

export type SinhVienDocument = SinhVien & Document;
@Schema({
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class SinhVien {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lop.name, required: true })
  @Type(() => Lop)
  maLop: Lop;

  @Prop({ type: String, required: true, trim: true })
  hoTen: string;

  @Prop({ type: Boolean, required: true, default: false })
  nu: boolean;

  @Prop({ type: Date, min: '1960-12-31', max: '2018-12-31' })
  ngaySinh?: Date;

  @Prop({ type: Number, default: 0 })
  hocBong: number;

  @Prop({ type: String })
  tinh?: string;
}

export const SinhVienSchema = SchemaFactory.createForClass(SinhVien);
