import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateItemDescriptionDto {
  @IsNotEmpty({ message: "Item description shouldn't be empty" })
  itemDescription: string;

  @IsNotEmpty({ message: "Code shouldn't be empty" })
  code: string;

  @IsDecimal()
  Weight: number;
}
