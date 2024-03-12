import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import { itemCondition, status } from '../../schemas/transfer-order.schema';
import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
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

  @IsDateString()
  @IsNotEmpty()
  transferDate: Date;

  @IsNotEmpty()
  driverName: string;

  @IsNotEmpty()
  @IsMongoId()
  fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;

  @IsEmpty()
  orderNo: number;

  @IsOptional()
  @IsEnum(status)
  status: status;

  @IsOptional()
  @IsString()
  orderNotes: string;
}
