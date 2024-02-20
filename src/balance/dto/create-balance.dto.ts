import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import { IsEmpty, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  code: string;

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

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;
}
