import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateItemDescriptionDto {
  @IsNotEmpty()
  itemDescription: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsDecimal()
  Weight: number;

  @IsNotEmpty()
  @IsDecimal()
  sellingPrice: number;

  @IsNotEmpty()
  @IsDecimal()
  purchasingPrice: number;

  @IsDecimal()
  @IsNotEmpty()
  rentingPrice: number;
}
