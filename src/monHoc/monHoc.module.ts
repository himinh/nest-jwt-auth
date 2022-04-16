import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonHocController } from './monHoc.controller';
import { MonHocService } from './monHoc.service';
import { MonHoc, MonHocSchema } from './schemas/monHoc.schema';

const MongooseMonHoc = MongooseModule.forFeature([
  { name: MonHoc.name, schema: MonHocSchema },
]);
@Module({
  imports: [MongooseMonHoc],
  controllers: [MonHocController],
  providers: [MonHocService],
  exports: [MongooseMonHoc],
})
export class MonHocModule {}
