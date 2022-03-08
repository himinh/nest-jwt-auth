// SinhVien(MaSV, HoTen, Nu, NgaySinh, MaLop, HocBong, Tinh)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop({ type: String, required: true, trim: true })
  hoTen: string;

  @Prop({ type: Boolean, required: true, default: false })
  nu: boolean;

  @Prop({ type: Date, min: '1960-12-31', max: '2018-12-31' })
  ngaySinh: Date;

  @Prop({ type: String })
  tinh: string;
}

export const SinhVienSchema = SchemaFactory.createForClass(SinhVien);
