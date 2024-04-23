import { ItemDescription } from 'src/schemas/item-description.schema';
import { Project } from 'src/schemas/project.schema';
import {
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { requestStatus } from 'src/schemas/request.schema';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  itemDescription: ItemDescription;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  // @IsNotEmpty()
  // @IsEnum(itemCondition)
  // itemCondition: itemCondition;

  // @IsNotEmpty()
  // @IsMongoId()
  // fromProject: Project;

  @IsNotEmpty()
  @IsMongoId()
  toProject: Project;

  @IsEmpty()
  requestNo: number;

  @IsOptional()
  @IsEnum(requestStatus)
  status: requestStatus;

  @IsNotEmpty()
  @IsString()
  activity: string;
}
