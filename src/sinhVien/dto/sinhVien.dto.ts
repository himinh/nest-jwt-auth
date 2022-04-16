import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateSinhVienDto {
  @IsMongoId()
  @IsNotEmpty()
  maLop: ObjectId;

  @IsString()
  @IsNotEmpty()
  hoTen: string;

  @IsBoolean()
  nu: true;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  ngaySinh: Date;

  @IsNumber()
  hocBong: 0;

  @IsString()
  tinh: string;
}

export class UpdateSinhVienDto extends PartialType(CreateSinhVienDto) {}
