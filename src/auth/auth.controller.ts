import {
  Get,
  Body,
  Controller,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUserId,
  GetSignedCookies,
  Public,
} from 'src/common/decorators';

import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { cookieOptions } from '../config/configuration';
import { AtGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Response() res) {
    const { access_token, refresh_token } = await this.authService.register(
      body,
    );

    res.cookie('_apprftoken', refresh_token, cookieOptions);

    res.send({ access_token });
  }

  @Post('/login')
  async login(@Body() body: AuthDto, @Response() res) {
    const { access_token, refresh_token } = await this.authService.login(
      body.email,
      body.password,
    );
    res.cookie('_apprftoken', refresh_token, cookieOptions);
    res.send({ access_token });
  }

  @Get('/refresh')
  async accessToken(
    @GetSignedCookies('_apprftoken') rf_token: string,
    @Response() res,
  ) {
    const { access_token, refresh_token } = await this.authService.refreshToken(
      rf_token,
    );

    res.cookie('_apprftoken', refresh_token, cookieOptions);
    return res.send({ access_token });
  }

  @Post('/logout')
  logout(@Response() res) {
    res.clearCookie('_apprftoken', { path: cookieOptions.path });
    return 'Logout success';
  }

  @Post('/forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @UseGuards(AtGuard)
  @Post('/reset-password')
  async resetPassword(
    @GetCurrentUserId() userId: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.resetPassword(userId, password);
    return user;
  }
}
