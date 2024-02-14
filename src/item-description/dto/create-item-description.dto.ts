import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateItemDescriptionDto {
  @IsNotEmpty({ message: "Item description shouldn't be empty" })
  itemDescription: string;

  @IsNotEmpty({ message: "Code shouldn't be empty" })
  code: string;

  @IsDecimal({}, { message: 'Weight is not a valid decimal number' })
  Weight: number;

  @IsDecimal({}, { message: 'Selling price is not a valid decimal number' })
  sellingPrice: number;

  @IsDecimal({}, { message: 'Purchasing price is not a valid decimal number' })
  purchasingPrice: number;
}
