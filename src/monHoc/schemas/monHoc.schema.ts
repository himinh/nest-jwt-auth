// MonHoc(MaMH, TenMH, SoTiet)
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type MonHocHocDocument = MonHoc & Document;
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
export class MonHoc {
  @Prop({ type: String, required: true, trim: true })
  tenMH: string;

  @Prop({ type: Number, required: true })
  soTiet: number;
}

export const MonHocSchema = SchemaFactory.createForClass(MonHoc);
