import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KhoaController } from './khoa.controller';
import { KhoaService } from './khoa.service';
import { Khoa, KhoaSchema } from './schemas/khoa.schema';
const MongooseKhoa = MongooseModule.forFeature([
  { name: Khoa.name, schema: KhoaSchema },
]);

@Module({
  imports: [MongooseKhoa],
  controllers: [KhoaController],
  providers: [KhoaService],
  exports: [MongooseKhoa],
})
export class KhoaModule {}
