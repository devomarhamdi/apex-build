import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { status } from 'src/schemas/transfer-order.schema';

export class UpdateIncomeDto {
  @IsNotEmpty()
  @IsEnum(status)
  status: status;

  @IsOptional()
  @IsString()
  orderNotes: string;
}
