import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { mongoUrl } from 'src/config/configuration';
import { config } from 'src/config/config';
import { LoggerMiddleware } from 'src/utils/logger.middleware';
import { UploadModule } from 'src/uploads/upload.module';
import { LopModule } from 'src/lop/lop.module';
import { KhoaModule } from 'src/khoa/khoa.module';
import { MonHocModule } from 'src/monHoc/monHoc.module';
import { SinhVienModule } from 'src/sinhVien/sinhVien.module';
import { KetQuaModule } from 'src/ketQua/ketQua.module';
import { BaiTapModule } from 'src/baiTap/baiTap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(mongoUrl),
    BaiTapModule,
    PostModule,
    UserModule,
    AuthModule,
    UploadModule,
    LopModule,
    KhoaModule,
    MonHocModule,
    SinhVienModule,
    KetQuaModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
