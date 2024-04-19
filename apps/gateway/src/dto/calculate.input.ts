import { IsArray, IsNotEmpty } from 'class-validator';

export class CalculateInput {
  @IsArray()
  @IsNotEmpty()
  numbers: number[];
}
