// KetQua(MaSV, MaMH, DiemThi)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { MonHoc } from 'src/monHoc/schemas/monHoc.schema';
import { SinhVien } from 'src/sinhVien/schemas/sinhVien.schema';

export type KetQuaDocument = KetQua & Document;

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
export class KetQua {
  @Prop({ type: Number, required: true, trim: true })
  diemThi: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MonHoc.name,
    required: true,
  })
  @Type(() => MonHoc)
  maMH: MonHoc;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: SinhVien.name,
    required: true,
  })
  @Type(() => SinhVien)
  maSV: SinhVien;
}

export const KetQuaSchema = SchemaFactory.createForClass(KetQua);
