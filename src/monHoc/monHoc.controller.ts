import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMonHocDto, UpdateMonHocDto } from './dto/monHoc.dto';
import { MonHocService } from './monHoc.service';
import { MonHocDocument } from './schemas/monHoc.schema';

@Controller('monHocs')
export class MonHocController {
  constructor(private readonly monHocService: MonHocService) {}

  @Get()
  getMonHocs(): Promise<MonHocDocument[]> {
    return this.monHocService.getMonHocs();
  }

  @Get(':monHocId')
  getMonHocById(@Param('monHocId') monHocId: string) {
    return this.monHocService.getMonHocById(monHocId);
  }

  @Post()
  createMonHoc(@Body() monHocDto: CreateMonHocDto): Promise<MonHocDocument> {
    return this.monHocService.createMonHoc(monHocDto);
  }

  @Patch(':monHocId')
  updateMonHoc(
    @Param('monHocId') monHocId: string,
    @Body() monHocDto: UpdateMonHocDto,
  ): Promise<MonHocDocument> {
    return this.monHocService.updateMonHoc(monHocId, monHocDto);
  }

  @Delete(':monHocId')
  deleteMonHoc(@Param('monHocId') monHocId): Promise<MonHocDocument> {
    return this.monHocService.deleteMonHoc(monHocId);
  }
}
