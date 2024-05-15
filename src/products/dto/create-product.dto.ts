import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Gallery, Image, Include, Other } from '../interfaces';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => Image)
  image: Image;

  @IsString()
  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @Type(() => Image)
  categoryImage: Image;

  @IsBoolean()
  new: boolean;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  features: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Include)
  includes: Include[];

  @ValidateNested()
  @Type(() => Gallery)
  gallery: Gallery;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Other)
  others: Other[];
}
