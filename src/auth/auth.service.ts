import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  accessExpiration,
  accessSecret,
  refreshExpiration,
  refreshSecret,
} from 'src/config/configuration';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userBody: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.createUser(userBody);
    const tokens = await this.getTokens(user.id, {
      email: user.email,
      role: user.role,
    });
    return tokens;
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password)))
      throw new BadRequestException('Incorrect email or password');
    return this.getTokens(user.id, { email: user.email, role: user.role });
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();
    const { sub: userId, email, role } = await this.verifyToken(refreshToken);
    return this.getTokens(userId, { email, role });
  }

  private async verifyToken(token: string) {
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: refreshSecret,
    });
    return decoded;
  }

  async getTokens(userId: string, data: { email: string; role: string }) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, ...data },
        { secret: accessSecret, expiresIn: accessExpiration },
      ),
      this.jwtService.signAsync(
        { sub: userId, ...data },
        { secret: refreshSecret, expiresIn: refreshExpiration },
      ),
    ]);

    return { access_token, refresh_token };
  }
}
