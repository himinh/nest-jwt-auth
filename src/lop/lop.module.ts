import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LopController } from './lop.controller';
import { LopService } from './lop.service';
import { Lop, LopSchema } from './schemas/lop.schema';

const MongooseLop = MongooseModule.forFeature([
  { name: Lop.name, schema: LopSchema },
]);
@Module({
  imports: [MongooseLop],
  controllers: [LopController],
  providers: [LopService],
  exports: [MongooseLop],
})
export class LopModule {}
