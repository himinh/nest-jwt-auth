import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLopDto, UpdateLopDto } from './dto/lop.dto';
import { LopService } from './lop.service';
import { LopDocument } from './schemas/lop.schema';

@Controller('lops')
export class LopController {
  constructor(private readonly lopService: LopService) {}
  @Get()
  async getLops(): Promise<LopDocument[]> {
    return this.lopService.getLops();
  }

  @Get(':lopId')
  async getLopById(@Param('lopId') lopId: string): Promise<LopDocument> {
    return this.lopService.getLopById(lopId);
  }

  @Post()
  async createLop(@Body() lopDto: CreateLopDto): Promise<LopDocument> {
    return this.lopService.createLop(lopDto);
  }

  @Patch(':lopId')
  async updateLop(
    @Param('lopId') lopId: string,
    @Body() lopDto: UpdateLopDto,
  ): Promise<LopDocument> {
    return this.lopService.updateLop(lopId, lopDto);
  }

  @Delete(':lopId')
  async deleteLop(@Param('lopId') lopId: string): Promise<LopDocument> {
    return this.lopService.deleteLop(lopId);
  }
}
