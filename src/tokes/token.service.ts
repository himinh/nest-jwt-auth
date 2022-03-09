import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface ITokenPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyToken(token: string, secret: string) {
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: secret,
    });
    return decoded;
  }

  async generateToken(
    payload: ITokenPayload,
    secretSignature: string,
    tokenLife: string,
  ) {
    return this.jwtService.signAsync(payload, {
      secret: secretSignature,
      expiresIn: tokenLife,
    });
  }

  async generateAccessToken(
    user: ITokenPayload,
    atSecret: string = this.configService.get('jwt').atSecret,
    atLife: string = this.configService.get('jwt').atLife,
  ) {
    return this.generateToken(user, atSecret, atLife);
  }

  async generateRefreshToken(
    user: ITokenPayload,
    rtSecret: string = this.configService.get('jwt').rtSecret,
    rtLife: string = this.configService.get('jwt').rtLife,
  ) {
    return this.generateToken(user, rtSecret, rtLife);
  }

  async verifyRefreshToken(
    refreshToken: string,
    rfSecret: string = this.configService.get('jwt').rtSecret,
  ) {
    const { id, email, name, role } = await this.verifyToken(
      refreshToken,
      rfSecret,
    );
    return { id, email, name, role };
  }
}
