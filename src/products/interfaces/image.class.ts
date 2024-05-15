import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Image {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  tablet: string;

  @IsString()
  @IsNotEmpty()
  desktop: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cart?: string;
}
