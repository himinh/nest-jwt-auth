import { Get, Body, Controller, Post, Response } from '@nestjs/common';
import { GetSignedCookies, Public } from 'src/common/decorators';

import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { cookieOptions } from '../config/configuration';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() body: CreateUserDto, @Response() res) {
    const { access_token, refresh_token } = await this.authService.register(
      body,
    );

    res.cookie('_apprftoken', refresh_token, cookieOptions);

    res.send({ access_token });
  }

  @Public()
  @Post('/sign-in')
  async login(@Body() body: AuthDto, @Response() res) {
    const { access_token, refresh_token } = await this.authService.login(
      body.email,
      body.password,
    );
    res.cookie('_apprftoken', refresh_token, cookieOptions);
    res.send({ access_token });
  }

  @Public()
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
}
