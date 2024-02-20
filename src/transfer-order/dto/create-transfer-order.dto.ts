import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import { itemCondition } from '../../schemas/transfer-order.schema';
import {
  IsDate,
  IsEmpty,
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

  @IsEmpty()
  transferId: string;

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
