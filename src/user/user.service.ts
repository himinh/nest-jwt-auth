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

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  async getUserById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('Not found user.');
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async createUser(userBody: CreateUserDto): Promise<UserDocument> {
    const userExists = await this.getUserByEmail(userBody.email);
    if (userExists)
      throw new BadRequestException('Email already in the system.');

    const hashPassword = await this.hashData(userBody.password);
    return this.userModel.create({ ...userBody, password: hashPassword });
  }

  async updateUser(
    userId: string,
    userBody: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.getUserById(userId);

    if (!user) throw new NotFoundException('Not found user.');

    if (userBody.email && (await this.getUserByEmail(userBody.email)))
      throw new BadRequestException('Email already in the system.');

    Object.assign(user, userBody);
    await user.save();
    return user;
  }

  async updatePassword(
    userId: string,
    password: string,
  ): Promise<UserDocument> {
    const hashPassword = await this.hashData(password);

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true },
    );

    if (!user) throw new NotFoundException('Not found user.');

    return user;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) throw new NotFoundException('Not found user.');
    return user;
  }
}
