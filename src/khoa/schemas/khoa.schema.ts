// Khoa(MaKhoa, TenKhoa, SoCBGD)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KhoaDocument = Khoa & Document;

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
export class Khoa {
  @Prop({ type: String, required: true, trim: true })
  tenKhoa: string;

  @Prop({ type: Number, required: true, default: 0 })
  soCBGD: number;
}

export const KhoaSchema = SchemaFactory.createForClass(Khoa);
