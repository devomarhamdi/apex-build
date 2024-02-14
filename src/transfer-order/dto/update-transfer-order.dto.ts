import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferOrderDto } from './create-transfer-order.dto';

export class UpdateTransferOrderDto extends PartialType(CreateTransferOrderDto) {}
