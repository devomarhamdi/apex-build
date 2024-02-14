import { IsDecimal, IsNotEmpty } from 'class-validator';

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
}
