import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDescriptionDto } from './create-item-description.dto';

export class UpdateItemDescriptionDto extends PartialType(CreateItemDescriptionDto) {}
