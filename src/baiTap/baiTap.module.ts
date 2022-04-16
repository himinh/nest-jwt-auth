import { Module } from '@nestjs/common';
import { KetQuaModule } from 'src/ketQua/ketQua.module';
import { KhoaModule } from 'src/khoa/khoa.module';
import { LopModule } from 'src/lop/lop.module';
import { MonHocModule } from 'src/monHoc/monHoc.module';
import { SinhVienModule } from 'src/sinhVien/sinhVien.module';
import { BaiTapController } from './baiTap.controller';
import { BaiTapService } from './baiTap.service';

@Module({
  imports: [KhoaModule, LopModule, SinhVienModule, MonHocModule, KetQuaModule],
  controllers: [BaiTapController],
  providers: [BaiTapService],
})
export class BaiTapModule {}
