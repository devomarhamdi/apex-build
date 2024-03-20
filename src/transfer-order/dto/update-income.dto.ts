import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { orderStatus } from 'src/schemas/transfer-order.schema';

export class UpdateIncomeDto {
  @IsNotEmpty()
  @IsEnum(orderStatus)
  status: orderStatus;

  @IsOptional()
  @IsString()
  orderNotes: string;
}
