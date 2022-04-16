import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { TokenModule } from 'src/tokens/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
@Module({
  imports: [UserModule, EmailModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
