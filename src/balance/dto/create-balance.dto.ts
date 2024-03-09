import { ItemDescription } from 'src/schemas/item-description.schema';
import { IsEmpty, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsNumber()
  good: number;

  @IsNotEmpty()
  @IsNumber()
  maintenance: number;

  @IsNotEmpty()
  @IsNumber()
  waste: number;

  @IsEmpty()
  totQTY: number;

  @IsEmpty()
  actQTY: number;
}
