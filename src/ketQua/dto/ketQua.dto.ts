import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateKetQuaDto {
  @IsNumber()
  @IsNotEmpty()
  diemThi: string;

  @IsMongoId()
  @IsNotEmpty()
  maMH: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  maSV: ObjectId;
}

export class UpdateKetQuaDto extends PartialType(CreateKetQuaDto) {}
