import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMonHocDto {
  @IsString()
  @IsNotEmpty()
  tenMH: string;

  @IsNumber()
  @IsNotEmpty()
  soTiet: number;
}

export class UpdateMonHocDto extends PartialType(CreateMonHocDto) {}
