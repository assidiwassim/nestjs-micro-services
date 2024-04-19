import { IsArray, IsNotEmpty } from 'class-validator';

export class SumInput {
  @IsArray()
  @IsNotEmpty()
  numbers_1: number[];

  @IsArray()
  @IsNotEmpty()
  numbers_2: number[];
}
