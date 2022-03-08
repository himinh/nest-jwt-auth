import { Model } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as argon2 from 'argon2';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getUsers() {
    return this.userModel.find();
  }

  getUserById(userId: string) {
    return this.userModel.findById(userId);
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async createUser(userBody: CreateUserDto) {
    const userExists = await this.getUserByEmail(userBody.email);
    if (userExists)
      throw new BadRequestException('Email already in the system.');

    const hashPassword = await this.hashData(userBody.password);
    return this.userModel.create({ ...userBody, password: hashPassword });
  }

  async updateUser(userId: string, userBody: UpdateUserDto) {
    const user = await this.getUserById(userId);

    if (!user) throw new NotFoundException('Not found user.');

    if (userBody.email && (await this.getUserByEmail(userBody.email)))
      throw new BadRequestException('Email already in the system.');

    Object.assign(user, userBody);
    await user.save();
    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) throw new NotFoundException('Not found user.');
    return user;
  }
}
