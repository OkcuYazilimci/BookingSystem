import { IsNotEmpty, IsDateString, IsEnum, IsString, IsMongoId, ArrayMinSize, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { GuestDto } from './guestDto';
import 'reflect-metadata';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  roomType!: string;

  @IsNotEmpty()
  @IsDateString()
  checkInDate!: string;

  @IsNotEmpty()
  @IsDateString()
  checkOutDate!: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GuestDto)
  guests!: GuestDto[];

  @IsNotEmpty()
  @IsString()
  paymentMethod!: string;

}