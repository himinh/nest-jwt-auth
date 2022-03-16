import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SinhVienController } from './sinhVien.controller';
import { SinhVienService } from './sinhVien.service';
import { SinhVien, SinhVienSchema } from './schemas/sinhVien.schema';
const MongooseSinhVien = MongooseModule.forFeature([
  { name: SinhVien.name, schema: SinhVienSchema },
]);
@Module({
  imports: [MongooseSinhVien],
  controllers: [SinhVienController],
  providers: [SinhVienService],
  exports: [MongooseSinhVien],
})
export class SinhVienModule {}
