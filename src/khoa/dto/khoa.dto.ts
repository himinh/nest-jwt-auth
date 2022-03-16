import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ObjectId } from 'mongodb';

export class CreateKhoaDto {
  @IsString()
  @IsNotEmpty()
  tenKhoa: string;

  @IsNumber()
  @IsNotEmpty()
  soCBGD: number;
}

export class UpdateKhoaDto extends PartialType(CreateKhoaDto) {}

export class ResponseKhoaDto extends PartialType(CreateKhoaDto) {
  @IsMongoId()
  id: ObjectId;
}
