import { IsNotEmpty, IsDateString, IsEnum, IsString, IsMongoId, ArrayMinSize, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class GuestDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEnum(['male', 'female', 'other'])
  gender!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age!: number;
}
