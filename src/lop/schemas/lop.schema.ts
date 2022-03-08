// Lop(MaLop, TenLop, MaKhoa)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Khoa } from 'src/khoa/schemas/khoa.schema';
export type LopDocument = Lop & Document;
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
class Lop {
  @Prop({ type: String, required: true, trim: true })
  tenLop: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: Khoa.name, required: true })
  @Type(() => Khoa)
  maKhoa: mongoose.Types.ObjectId;
}

export const LopSchema = SchemaFactory.createForClass(Lop);
