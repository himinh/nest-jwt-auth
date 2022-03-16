import { registerAs } from '@nestjs/config';

export const cookieOptions = {
  signed: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
  httpOnly: true,
  sameSite: true,
  secure: true,
};

export const accessSecret = 'accessSecret';
export const accessExpiration = '15m';
export const refreshSecret = 'refreshSecret';
export const refreshExpiration = '7d';

export const mongoUrl =
  'mongodb+srv://nestapi:nestapi@cluster0.4en5k.mongodb.net/nest-api?retryWrites=true&w=majority';
