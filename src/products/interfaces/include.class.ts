import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Include {
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  item: string;
}
