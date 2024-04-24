import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import { itemCondition, orderStatus } from '../../schemas/transfer-order.schema';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(itemCondition)
  itemCondition: itemCondition;

  // Add missing properties
  orderNo: number;
  transferId: string;
  status: orderStatus;
}

export class CreateMultipleTransferOrderDto {
  @IsNotEmpty()
  @IsDateString()
  transferDate: Date;

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;

  @IsNotEmpty()
  @IsNumber()
  transferNumber: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  @IsNotEmpty()
  orders: OrderDto[];
}
