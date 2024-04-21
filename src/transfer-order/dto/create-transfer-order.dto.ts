import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import { itemCondition, orderStatus } from '../../schemas/transfer-order.schema';
import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransferOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsEmpty()
  transferId: string;

  @IsNotEmpty()
  @IsEnum(itemCondition)
  itemCondition: itemCondition;

  @IsDateString()
  @IsNotEmpty()
  transferDate: Date;

  // @IsNotEmpty()
  // @IsString()
  // driverName: string;

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;

  @IsEmpty()
  orderNo: number;

  @IsOptional()
  @IsEnum(orderStatus)
  status: orderStatus;

  @IsOptional()
  @IsString()
  orderNotes: string;

  @IsNotEmpty()
  @IsNumber()
  transferNumber: number;
}
