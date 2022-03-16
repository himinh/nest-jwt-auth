import { Get, Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { GetCurrentUserId, GetSignedCookies } from 'src/common/decorators';

import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AtGuard } from 'src/common/guards';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // User Sign Up
  @Post('/register')
  async register(@Body() body: CreateUserDto, @Res({ passthrough: true }) res) {
    // register
    const { access_token, refresh_token } = await this.authService.register(
      body,
    );

    // store refresh token in cookie
    res.cookie(
      this.configService.get('cookies').key.rfToken,
      refresh_token,
      this.configService.get('cookies').options,
    );

    return { access_token };
  }

  // User Login
  @Post('/login')
  async login(@Body() body: AuthDto, @Res({ passthrough: true }) res) {
    // Login
    const { access_token, refresh_token } = await this.authService.login(
      body.email,
      body.password,
    );

    // Store refresh token in cookies
    res.cookie(
      this.configService.get('cookies').key.rfToken,
      refresh_token,
      this.configService.get('cookies').options,
    );

    return { access_token };
  }

  // Gell new access token
  @Get('/refresh')
  async accessToken(
    @GetSignedCookies('_apprftoken')
    rf_token: string,
    @Res({ passthrough: true }) res,
  ) {
    // Generate new tokens from rf_token
    const { access_token, refresh_token } = await this.authService.refreshToken(
      rf_token,
    );

    // Store refresh token in cookies
    res.cookie(
      this.configService.get('cookies').key.rfToken,
      refresh_token,
      this.configService.get('cookies').options,
    );
    return { access_token };
  }

  // User logout
  @Post('/logout')
  logout(@Res({ passthrough: true }) res) {
    // Clear refresh token in cookies
    res.clearCookie(this.configService.get('cookies').key.rfToken);
    return 'Logout success';
  }

  // Send mail
  @Post('/forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  // Reset password
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
