import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
export class CreateLopDto {
  @IsString()
  @IsNotEmpty()
  tenLop: string;

  @IsMongoId()
  @IsNotEmpty()
  maKhoa: ObjectId;
}

export class UpdateLopDto extends PartialType(CreateLopDto) {}
