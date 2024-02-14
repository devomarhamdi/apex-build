import { ItemDescription } from 'src/item-description/schema/item-description.schema';
import { Project } from 'src/projects/schema/project.schema';
import { itemCondition } from '../schema/transfer-order.schema';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTransferOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(itemCondition)
  itemCondition: itemCondition;

  @IsDate()
  @IsOptional()
  transferDate: Date;

  @IsNotEmpty()
  driverName: string;

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;
}
