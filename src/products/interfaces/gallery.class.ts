import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Image } from './image.class';

export class Gallery {
  @ValidateNested()
  @Type(() => Image)
  first: Image;

  @ValidateNested()
  @Type(() => Image)
  second: Image;

  @ValidateNested()
  @Type(() => Image)
  third: Image;
}
