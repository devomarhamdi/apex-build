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
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransferOrderDto {
  @IsDateString()
  @IsNotEmpty()
  transferDate: Date;

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;

  @IsOptional()
  @IsEnum(orderStatus)
  status: orderStatus;

  @IsOptional()
  @IsString()
  orderNotes: string;

  @IsNotEmpty()
  @IsNumber()
  transferNumber: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Order)
  orders: Order[];
}

export class Order {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(itemCondition)
  itemCondition: itemCondition;

  orderNo?: number;
  transferId?: string;
  status?: orderStatus;
}
