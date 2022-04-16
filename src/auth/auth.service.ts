import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { TokenService } from 'src/tokens/token.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {}

  async register(userBody: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.createUser(userBody);

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const tokens = await this.getTokens(tokenPayload);
    return tokens;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password)))
      throw new BadRequestException('Incorrect email or password');

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return this.getTokens(tokenPayload);
  }

  async refreshToken(refresh: string) {
    const data = await this.tokenService.verifyRefreshToken(refresh);
    return this.getTokens(data);
  }

  async getTokens(user: {
    id: string;
    email: string;
    role: string;
    name: string;
  }) {
    const [access_token, refresh_token] = await Promise.all([
      this.tokenService.generateAccessToken(user),
      this.tokenService.generateRefreshToken(user),
    ]);
    return { access_token, refresh_token };
  }

  async forgotPassword(email: string) {
    // check user
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new BadRequestException('Email does not exist in the system.');

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // generate token
    const token = await this.tokenService.generateAccessToken(tokenPayload);

    // send mail
    let info = await this.emailService.sendMailResetPassword(
      user.email,
      token,
      user.name,
    );
    return info;
  }

  async resetPassword(userId: string, password: string) {
    const user = await this.userService.updatePassword(userId, password);
    return user;
  }
}
