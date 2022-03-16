import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KetQuaController } from './ketQua.controller';
import { KetQuaService } from './ketQua.service';
import { KetQua, KetQuaSchema } from './schemas/ketQua.schema';

const MongooseKhoa = MongooseModule.forFeature([
  { name: KetQua.name, schema: KetQuaSchema },
]);

@Module({
  imports: [MongooseKhoa],
  controllers: [KetQuaController],
  providers: [KetQuaService],
  exports: [MongooseKhoa],
})
export class KetQuaModule {}
