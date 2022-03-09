import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { GetCurrentUserId, Public, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AtGuard)
  @Get('profile')
  getProfile(@GetCurrentUserId() userId: string) {
    return this.userService.getUserById(userId);
  }

  @UseGuards(AtGuard)
  @Patch('profile')
  updateProfile(
    @GetCurrentUserId() userId: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, body);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Patch(':userId')
  updateUser(@Param('userId') userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(userId, body);
  }

  @UseGuards(RoleGuard(Role.Admin))
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
