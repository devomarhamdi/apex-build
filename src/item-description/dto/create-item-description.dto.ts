import { IsDecimal, IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemDescriptionDto {
  @IsNotEmpty()
  itemDescription: string;

  @IsNotEmpty()
  code: string;

  @IsDecimal()
  Weight: number;

  @IsDecimal()
  sellingPrice: number;

  @IsDecimal()
  purchasingPrice: number;

  @IsNumber()
  good: number;

  @IsNumber()
  maintenance: number;

  @IsNumber()
  waste: number;

  @IsEmpty()
  actQTY: number;

  @IsEmpty()
  totQTY: number;
}
