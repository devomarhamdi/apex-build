import { ItemDescription } from 'src/schemas/item-description.schema';
import { IsEmpty, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Project } from 'src/schemas/project.schema';

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsMongoId()
  project: Project;

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
